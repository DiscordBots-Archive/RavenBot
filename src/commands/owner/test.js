const { Command } = require('discord-akairo');
const ReactionRole = require('../../models/ReactionRoles');

class TestCommand extends Command {
    constructor() {
        super('test', {
            aliases: ['test'],
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
        const data = await ReactionRole.destroy({ where: { guildID: message.guild.id }});
        console.log(JSON.stringify(data));
    }
}

module.exports = TestCommand;