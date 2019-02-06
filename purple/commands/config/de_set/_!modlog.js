const { Command } = require('discord-akairo');

class ToggleModLogCommand extends Command {
    constructor() {
        super('toggle-modlog', {
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
        
        const modLog = this.client.settings.get(message.guild.id, 'modLogChannel', undefined);
        if (modLog) {
            this.client.settings.delete(message.guild.id, 'modLogChannel', undefined);
            return message.util.reply(`successfully deactivated mod-log!`);
        }
    }
}

module.exports = ToggleModLogCommand;