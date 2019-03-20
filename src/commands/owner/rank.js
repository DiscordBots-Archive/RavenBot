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
        const data = await Level.findOne({ where: { guildID: message.guild.id, userID: member.user.id }});
        const embed = this.client.util.embed().setAuthor(member.user.tag, member.user.displayAvatarURL())
        .addField('Level', data.level).addField('Commands Used', data.uses).setColor(0x8387db);
        return message.util.send({ embed });
    }
}

module.exports = RankCommand;