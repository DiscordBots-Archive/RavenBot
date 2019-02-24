const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            args: [
                {
                    id: 'listenerID'
                }
            ],
            ownerOnly: true,
            category: 'owner'
        });
    }

    exec(message, args) {
        // `this` refers to the command object.
        this.client.listenerHandler.reload(args.listenerID);
        return message.reply(`Reloaded ${args.listenerID}!`);
    }
}

module.exports = ReloadCommand;