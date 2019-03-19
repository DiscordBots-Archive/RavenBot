const { Command } = require('discord-akairo');
const Commands = require('../../models/Commands');
const { db } = require('../../struct/Database');
const Sequelize = require('sequelize');

class CommandStatsCommand extends Command {
    constructor() {
        super('command-stats', {
            aliases: ['command-stats'],
            category: 'rank',
        })
    }

    async exec(message) {
        const command = await Commands.findAll({ where: { guildID: message.guild.id }});
        const totaluses = command.reduce((count, c) => {
            return count + c.uses;
        }, 0);

        const allCommand = await db.query(`
            SELECT
                MAX("uses") AS topcommand,
                "commandID"
            FROM commands
            WHERE "guildID" = :guildID
            GROUP BY "commandID" ORDER BY topcommand DESC
            OFFSET :offset
            LIMIT :limit
        `, {
            type: db.Sequelize.QueryTypes.SELECT,
            replacements: {
                guildID: message.guild.id,
                offset: 0,
                limit: 10
            }
        })

        const commands = await Promise.all(allCommand.map(async row => {
            return { command: row.commandID, uses: row.topcommand }
        }))

        const allUsers = await db.query(`
            SELECT
                MAX("uses") AS topusers,
                "userID"
            FROM userlevels
            WHERE "guildID" = :guildID
            GROUP BY "userID" ORDER BY topusers DESC
            OFFSET :offset
            LIMIT :limit
        `, {
            type: db.Sequelize.QueryTypes.SELECT,
            replacements: {
                guildID: message.guild.id,
                offset: 0,
                limit: 10
            }
        })

        const users = await Promise.all(allUsers.map(async row => {
            const user = await this.client.users.fetch(row.userID).catch(() => ({ tag: 'Couldn\'t Fetch User' }));
            return { tag: user.tag, uses: row.topusers }
        }))

        const embed = this.client.util.embed().setAuthor(message.guild.name, message.guild.iconURL()).setColor(0x8387db)
        .setTitle(`Total ${totaluses} commands used`)
        if (users.length) {
            const desc = users.map(({ tag, uses }, index) => `${1 + index}. **${tag}** (${uses} uses)`);
            embed.addField(`Top Users`, desc)
        }
        if (commands.length) {
            const desc = commands.map(({ command, uses }, index) => `${1 + index}. **${command}** (${uses} uses)`);
            embed.addField(`Top Commands`, desc)
        }
        return message.util.send({ embed });
    }
}

module.exports = CommandStatsCommand;