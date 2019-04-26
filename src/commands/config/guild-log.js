const { Command } = require('discord-akairo');

class SetGuildLogCommand extends Command {
	constructor() {
		super('set-guildlog', {
			aliases: ['set-log', 'guildlog'],
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
				content: 'Sets the guild log.',
				usage: '<channel>',
				examples: ['#guild-log']
			}
		});
	}

	async exec(message, { channel }) {
		if (!channel) return;
		this.client.settings.set(message.guild, 'guildLog', channel.id);
		return message.util.reply(`set guild-log channel to **${channel.name}**`);
	}
}

module.exports = SetGuildLogCommand;
