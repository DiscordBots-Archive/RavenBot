const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload', 'reboot'],
            description: {
                content: 'Reload all commandHandler, listenerHandler, inhibitorHandler',
            },
            ownerOnly: true,
            category: 'util',
            ratelimit: 2,
        });
    }

    async exec(message) {

        this.client.inhibitorHandler.removeAll() && this.client.inhibitorHandler.loadAll();
        this.client.listenerHandler.removeAll() && this.client.listenerHandler.loadAll();
        this.client.commandHandler.removeAll() && this.client.commandHandler.loadAll()
        
        return message.util.send(`*${message.author}, reloaded all commandHandler, listenerHandler & inhibitorHandler*`);
    }
}

module.exports = ReloadCommand;