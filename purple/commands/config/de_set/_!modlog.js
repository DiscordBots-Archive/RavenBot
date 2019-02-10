const { Command } = require('discord-akairo');

class ToggleModLogCommand extends Command {
    constructor() {
        super('toggle-modlog', {
            category: 'config',
            channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            ratelimit: 2
        });
    }

    async exec(message) {
        
        const modLog = this.client.settings.get(message.guild.id, 'modLogChannel', undefined);
        if (modLog) {
            this.client.settings.delete(message.guild.id, 'modLogChannel');
            return message.util.reply(`*successfully deactivated mod-log!*`);
        }
    }
}

module.exports = ToggleModLogCommand;