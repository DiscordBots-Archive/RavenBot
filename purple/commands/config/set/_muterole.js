const { Command } = require('discord-akairo');

class SetMuteRoleCommand extends Command {
    constructor() {
        super('set-muterole', {
            description: {
                content: 'Sets mute role to mute members on your server',
                usage: '<role>',
                examples: ['@Muted', 'Muted', '85631234567890']
            },
            category: 'config',
            channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            ratelimit: 2,
            args: [
                {
                    id: 'role',
                    match: 'content',
                    type: 'role',
                    prompt: {
                        start: message => `${message.author}, what role you want to set?`,
                        retry: message => `${message.author}, please provide a valid role...`
                    }
                }
            ]
        });
    }

    async exec(message, { role }) {

        this.client.settings.set(message.guild.id, 'muteRole', role.id);
		return message.util.reply(`*set mute role to **${role.name}**\u200b*`);
    }
}

module.exports = SetMuteRoleCommand;