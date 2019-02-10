const { Command } = require('discord-akairo');

class ToggleGuildLogCommand extends Command {
    constructor() {
        super('toggle-guildlog', {
           description: {
               content: 'Sets the mod log many of the commands use to log moderation actions',
               usage: '<channel>',
               examples: ['#mod-log', 'mod-log', '5465454654985659']
           },
           category: 'config',
           channel: 'guild',
           userPermissions: ['MANAGE_GUILD'],
           ratelimit: 2,
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