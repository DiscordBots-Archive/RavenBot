const { Command } = require('discord-akairo');
const Level = require('../../models/UserLevel');

class RankCommand extends Command {
    constructor() {
        super('rank', {
            aliases: ['rank'],
            category: 'owner',
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: messsage => messsage.member
                }
            ]
        })
    }

    async exec(message, { member }) {
        const data = await Level.update({ tagUses: 1 }, { where: { guildID: message.guild.id, userID: member.user.id }});
    }
}

module.exports = RankCommand;