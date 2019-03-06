const { Command } = require('discord-akairo');

class SetModChannelCommand extends Command {
	constructor() {
		super('set-modlog', {
			aliases: ['set-modlog', 'modchan', 'mod-channel'],
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
				content: 'Sets the mod log many of the commands use to log moderation actions.',
				usage: '<channel>',
				examples: ['#mod-log', 'mog-log']
			}
		});
	}

	async exec(message, { channel }) {
		if (!channel) return;
		this.client.settings.set(message.guild, 'modLogChannel', channel.id);
		return message.util.reply(`set moderation log channel to **${channel.name}**`);
	}
}

module.exports = SetModChannelCommand;