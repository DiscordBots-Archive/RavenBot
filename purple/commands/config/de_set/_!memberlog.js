const { Command } = require('discord-akairo');

class ToggleMemberLogCommand extends Command {
    constructor() {
        super('toggle-memberlog', {
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
        const memberLog = this.client.settings.get(message.guild.id, 'memberLog', undefined);
        if (memberLog) {
            this.client.settings.delete(message.guild.id, 'memberLog');
            return message.util.reply(`*successfully deactivated member-log!*`);
        }

    }
}

module.exports = ToggleMemberLogCommand;