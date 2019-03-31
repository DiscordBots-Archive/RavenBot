const { Command } = require('discord-akairo');

class TestCommand extends Command {
    constructor() {
        super('test', {
            aliases: ['test'],
            category: 'owner',
            ownerOnly: true
        })
    }

    async exec(message) {}
}

module.exports = TestCommand;