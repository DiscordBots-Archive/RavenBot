const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
    constructor() {
        super('reload-all', {
            aliases: ['reload-all', 'reboot-all'],
            description: {
                content: 'Reload all commandHandler, listenerHandler, inhibitorHandler',
            },
            ownerOnly: true,
            category: 'util',
            ratelimit: 2,
        });
    }

    async exec(message) {

        const cmd = this.client.commandHandler.modules.size;
        const listener = this.client.listenerHandler.modules.size;
        const inhibitor = this.client.inhibitorHandler.modules.size;

        this.client.inhibitorHandler.removeAll() && this.client.inhibitorHandler.loadAll();
        this.client.listenerHandler.removeAll() && this.client.listenerHandler.loadAll();
        this.client.commandHandler.removeAll() && this.client.commandHandler.loadAll();
        
        return message.util.send(`Reloaded: ${cmd} commandHandler \nReloaded: ${listener} listenerHandler \nReloaded: ${inhibitor} inhibitorHandler`, {code: 'js'});
    }
}

module.exports = ReloadCommand;