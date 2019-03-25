const { Command } = require('discord-akairo');
const Commands = require('../../models/Commands');
const Levels = require('../../models/UserLevel');
const Tags = require('../../models/Tags');
const { fn, col, Op, literal } = require('sequelize');
const { db } = require('../../struct/Database');

class TestCommand extends Command {
    constructor() {
        super('test', {
            aliases: ['test'],
            category: 'owner',
            args: [
                {
                    id: 'totag',
                    match: 'flag',
                    flag: ['--toptag']
                },
                {
                    id: 'cmdusers',
                    match: 'flag',
                    flag: ['--commandusers']
                }
            ]
        })
    }

    async exec(message, { totag, cmdusers}) {
        const cmdTotal = await Commands.sum('uses', { where: { guildID: message.guild.id, categoryID: { [Op.ne]: 'tags' } }}) || 0;
        const tagTotal = await Tags.sum('uses', { where: { guildID: message.guild.id }}) || 0;
        const tags = await Tags.findAll({ where: { guildID: message.guild.id }});

        const _topTags = await Tags.findAll({
            where: { guildID: message.guild.id },
            group: ['tags.id'],
            order: [ [ fn('max', col('uses')), 'DESC' ] ],
            limit: 3, offset: 0
        })
        const topTags = await Promise.all(_topTags.map(async row => {
            const user = await this.client.users.fetch(row.authorID).catch(() => ({ tag: `Couldn't Fetch User` }));
            return { tag: user.tag, uses: row.uses, name: row.name };
        }))

        const _topCommands = await Commands.findAll({
            where: { guildID: message.guild.id, categoryID: { [Op.ne]: 'tags' } },
            group: ['commands.id'],
            order: [ [ fn('max', col('uses')), 'DESC' ] ],
            limit: 3, offset: 0
        })
        const topCommands = await Promise.all(_topCommands.map(async row => {
            return { uses: row.uses, name: row.commandID };
        }))

        // This method is not working.
        /*const _topMaker = await Tags.findAll({
            group: ['authorID'], where: { guildID: message.guild.id },
            attributes: [ [literal(`(SELECT COUNT("authorID"))`), 'total'], "authorID" ],
            order: [ [literal('total'), 'DESC'] ], limit: 3, offset: 0
        });*/
        const _topMaker = await db.query(`
            SELECT
                COUNT("authorID") AS total,
                "authorID"
            FROM tags
            WHERE "guildID" = :guildID
            GROUP BY "authorID" ORDER BY total DESC
            OFFSET :offset
            LIMIT :limit
        `, {
            type: db.Sequelize.QueryTypes.SELECT,
            replacements: {
                guildID: message.guild.id,
                offset: 0,
                limit: 3
            }
        })
        const topMaker = await Promise.all(_topMaker.map(async row => {
            const user = await this.client.users.fetch(row.authorID).catch(() => ({ tag: `Couldn't Fetch User`}));
            return { tag: user.tag, total: row.total };
        }))

        const _topCmdUsers = await Levels.findAll({
            where: { guildID: message.guild.id },
            group: ['userlevels.id'],
            order: [ [ fn('max', col('commandUses')), 'DESC' ] ],
            limit: 3, offset: 0
        })
        const topCmdUsers = await Promise.all(_topCmdUsers.map(async row => {
            const user = await this.client.users.fetch(row.userID).catch(() => ({ tag: `Couldn't Fetch User`}));
            return { cmdUses: row.commandUses, cmdName: row.commandAlias, tagUses: row.tagUses, tag: user.tag };
        }))

        const _topTagUsers = await Levels.findAll({
            where: { guildID: message.guild.id },
            group: ['userlevels.id'],
            order: [ [ fn('max', col('tagUses')), 'DESC' ] ],
            limit: 3, offset: 0
        })
        const topTagUsers = await Promise.all(_topTagUsers.map(async row => {
            const user = await this.client.users.fetch(row.userID).catch(() => ({ tag: `Couldn't Fetch User`}));
            return { tagUses: row.tagUses, tag: user.tag };
        }))

        if (totag) {
            return message.util.send(JSON.stringify(topTags))
        }
        if (cmdusers) {
            return message.util.send(JSON.stringify(topCmdUsers))
        }
    }
}

module.exports = TestCommand;