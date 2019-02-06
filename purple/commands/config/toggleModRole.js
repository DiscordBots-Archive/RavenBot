const { Command } = require('discord-akairo');

class ToggleModRoleCommand extends Command {
    constructor() {
        super('toggle-modrole', {
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
        
        const modRole = this.client.settings.get(message.guild.id, 'modRole', undefined);
        if (modRole) {
            this.client.settings.delete(message.guild.id, 'modRole', undefined);
            return message.util.reply(`successfully deactivated mod-role!`);
        }
    }
}

module.exports = ToggleModRoleCommand;