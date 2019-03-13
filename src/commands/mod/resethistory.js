const { Command } = require('discord-akairo');

class ResetHistoryCommand extends Command {
    constructor() {
        super('reset-history', {
            aliases: ['reset-history'],
            category: 'mod',
            ownerOnly: true,
            channel: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ],
            description: {
                content: 'Deletes all cases for the specified user.',
                usage: '<member>',
                examples: ['@Suvajit']
            }
        })
    }

    async exec(message, { member }) {

    }
}

module.exports = ResetHistoryCommand;