const { Command } = require('discord-akairo');

class SetDJRoleCommand extends Command {
	constructor() {
		super('set-dj', {
			aliases: ['set-dj', 'dj-role'],
			description: {
				content: 'Sets the DJ role many of the commands use for permission checking.',
				usage: '<role>',
				examples: ['dj @DJ', 'dj DJ']
			},
			category: 'music',
			channel: 'guild',
			userPermissions: ['MANAGE_GUILD'],
			ratelimit: 2,
			args: [
				{
					id: 'role',
					match: 'content',
					type: 'role'
				}
			]
		});
	}

	async exec(message, { role }) {
		this.client.settings.set(message.guild.id, 'djRole', role.id);
		return message.util.reply(`set DJ role to **${role.name}**`);
	}
}
module.exports = SetDJRoleCommand;