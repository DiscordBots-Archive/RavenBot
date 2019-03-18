const { Command } = require('discord-akairo');
const Tags = require('../../models/Tags');
const { db } = require('../../struct/Database');
const EMOJIS = ({
    1: '<:first_place:557144859085897740>',
    2: '<:second_place:557146273812054026>',
    3: '<:third_place:557146273732493312>'
})

class TagStatsCommand extends Command {
    constructor() {
        super('tag-stats', {
            aliases: ['tag-stats'],
            category: 'tag',
            channel: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ],
            description: {
                content: 'Displays tag statistics of a member.',
                usage: '<member>',
                examples: ['@Suvajit']
            }
        })
    }

    async exec(message, { member }) {

        if (member) {
            const allTags = await db.query(`
                SELECT
                    MAX("uses") AS toptag,
                    "authorID",
                    "name"
                FROM tags
                WHERE "guildID" = :guildID AND "authorID" = :authorID
                GROUP BY "authorID", "name" ORDER BY toptag DESC
                OFFSET :offset
                LIMIT :limit
            `, {
                type: db.Sequelize.QueryTypes.SELECT,
                replacements: {
                    authorID: member.user.id,
                    guildID: message.guild.id,
                    offset: 0,
                    limit: 3
                }
            })
            const tags = await Tags.findAll({ where: { authorID: member.user.id, guildID: message.guild.id }});
            const totaluses = tags.reduce((count, c) => {
                return count + c.uses;
            }, 0);
    
            const users = await Promise.all(allTags.map(async row => {
                const user = await this.client.users.fetch(row.authorID).catch(() => ({ tag: 'Could not fetch user.'}));
    
                return { tag: user.tag, toptag: row.toptag, name: row.name }
            }))
    
            const embed = this.client.util.embed().setColor(0x8387db)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
    
            if (users.length) {
                const desc = users.map(({ tag, toptag, name }, index) => `${EMOJIS[1 + index]} ${name} (${toptag} uses)`);
                embed.addField(`Owned Tags`, tags.length).addField(`Owned Tag Uses`, totaluses)
                .addField('Top Tags', desc)
            }
            return message.util.send({ embed });
        }

        const allTags = await db.query(`
            SELECT
                MAX("uses") AS toptag,
                "authorID",
                "name"
            FROM tags
            WHERE "guildID" = :guildID
            GROUP BY "authorID", "name" ORDER BY toptag DESC
            OFFSET :offset
            LIMIT :limit
        `, {
            type: db.Sequelize.QueryTypes.SELECT,
            replacements: {
                guildID: message.guild.id,
                offset: 0,
                limit: 3
            }
        });
        const tags = await Tags.findAll({ where: { guildID: message.guild.id }});
        const totaluses = tags.reduce((count, c) => {
            return count + c.uses;
        }, 0);

        const users = await Promise.all(allTags.map(async row => {
            const user = await this.client.users.fetch(row.authorID).catch(() => ({ tag: 'Could not fetch user.'}));

            return { tag: user.tag, toptag: row.toptag, name: row.name }
        }))

        const embed = this.client.util.embed().setColor(0x8387db)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL())

        if (users.length) {
            const desc = users.map(({ tag, toptag, name }, index) => `${EMOJIS[1 + index]} ${name} (${toptag} uses)`);
            embed.addField(`Total Tags`, tags.length).addField(`Total Uses`, totaluses)
            .addField('Top Tags', desc)
        }
        return message.util.send({ embed });
    }
}

module.exports = TagStatsCommand;