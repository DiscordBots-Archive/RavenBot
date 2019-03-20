const { Command } = require('discord-akairo');

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

    async exec(message, { member }) {}
}

module.exports = TestCommand;