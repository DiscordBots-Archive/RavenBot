const { Command } = require('discord-akairo');

class ToggleGuildLogCommand extends Command {
    constructor() {
        super('toggle-guildlog', {
            category: 'config',
            channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            ratelimit: 2
        });
    }

    async exec(message) {
        const guildLog = this.client.settings.get(message.guild.id, 'guildLog', undefined);
        if (guildLog) {
            this.client.settings.delete(message.guild.id, 'guildLog');
            this.client.settings.delete(message.guild.id, 'WebhookID');
            this.client.settings.delete(message.guild.id, 'WebhookToken');
            return message.util.reply(`*successfully deactivated guild-log!*`);
        }
    }
}

module.exports = ToggleGuildLogCommand;