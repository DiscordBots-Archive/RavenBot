const { Command } = require('discord-akairo');

class ToggleAutoRoleCommand extends Command {
    constructor() {
        super('toggle-autorole', {
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
        
        const autoRole = this.client.settings.get(message.guild.id, 'autoRole', undefined);
        if (autoRole) {
            this.client.settings.delete(message.guild.id, 'autoRole', undefined);
            return message.util.reply(`successfully deactivated auto-role!`);
        }
    }
}

module.exports = ToggleAutoRoleCommand;