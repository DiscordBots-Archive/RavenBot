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

    exec(message, args) {
        //this.client.listenerHandler.reload(args.listenerID);
        this.client.inhibitorHandler.reloadAll();
        this.client.listenerHandler.reloadAll();
        this.client.commandHandler.reloadAll();
        return message.reply(`Reloaded all commandHandler, listenerHandler, inhibitorHandler`);
    }
}

module.exports = ReloadCommand;