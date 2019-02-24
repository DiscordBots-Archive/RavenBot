const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            description: {
                content: 'Reloaded all commandHandler, listenerHandler, inhibitorHandler',
                usage: '<>',
                examples: ['<>..']
            },
            ownerOnly: true,
            category: 'util',
            ratelimit: 2,
        });
    }

    async exec(message) {

        this.client.inhibitorHandler.removeAll() && this.client.inhibitorHandler.reloadAll();
        this.client.listenerHandler.removeAll() && this.client.listenerHandler.reloadAll();
        this.client.commandHandler.removeAll() && this.client.commandHandler.loadAll()
        
        return message.util.send(`*${message.author}, reloaded all commandHandler, listenerHandler & inhibitorHandler*`);
    }
}

module.exports = ReloadCommand;