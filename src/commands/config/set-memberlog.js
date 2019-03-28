const { Command } = require('discord-akairo');

class SetMemberLogCommand extends Command {
	constructor() {
		super('set-memberlog', {
			aliases: ['set-memberlog', 'memberlog'],
			category: 'config',
			channel: 'guild',
			userPermissions: ['MANAGE_GUILD'],
			ratelimit: 2,
			args: [
				{
					id: 'channel',
					match: 'content',
					type: 'textChannel'
				}
			],
			description: {
				content: 'Sets the member log channel of the guild.',
				usage: '<channel>',
				examples: ['#member-log', 'member-log']
			}
		});
	}

	async exec(message, { channel }) {
		if (!channel) return;
		this.client.settings.set(message.guild, 'memberLog', channel.id);
		return message.util.reply(`set member log channel to **${channel.name}**`);
	}
}

module.exports = SetMemberLogCommand;