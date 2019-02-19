const { Command } = require('discord-akairo');

class SetModRoleCommand extends Command {
    constructor() {
        super('set-modrole', {
            aliases: ['set-mod', 'mod-role'],
            description: {
                content: 'Sets the mod role of thr command use for permission checking',
                usage: '<role>',
                examples: ['@Mod', 'Admin', '85631234567890']
            },
            category: 'mod',
            channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            ratelimit: 2,
            args: [
                {
                    id: 'role',
                    type: 'role',
                    match: 'content',
                    prompt: {
                        start: message => `${message.author}, what role you want to set?`,
                        retry: message => `${message.author}, please provide a valid role...`
                    }
                }
            ]
        });
    }

    async exec(message, { role }) {

        const modrole = this.client.settings.get(message.guild.id, 'modRole', []);
		if (modrole.includes(role.id)) {
			const index = modrole.indexOf(role.id);
			modrole.splice(index, 1);
			if (modrole.length === 0) this.client.settings.delete(message.guild.id, 'modRole');
			else this.client.settings.set(message.guild.id, 'modRole', modrole);

			return message.util.send(`*Successfully removed this mod role [**${role.name}**]*`);
		}

        modrole.push(role.id);
        this.client.settings.set(message.guild.id, 'modRole', modrole);
		return message.util.reply(`*set mod role to **${role.name}**\u200b*`);
    }
}

module.exports = SetModRoleCommand;