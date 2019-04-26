const { Command } = require('discord-akairo');

class TagDeleteCommand extends Command {
	constructor() {
		super('tag-delete', {
			aliases: ['tag-delete'],
			category: 'tags',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'tag',
					match: 'content',
					type: 'tag',
					prompt: {
						start: 'what tag do you want to delete?',
						retry: (msg, args, { phrase }) => `a tag with the name **${phrase}** does not exist.`
					}
				}
			],
			description: {
				content: 'Deletes a tag.',
				usage: '<tag>'
			}
		});
	}

	async exec(message, { tag }) {
		const staffRole = message.member.roles.has(this.client.settings.get(message.guild, 'modRole', undefined));
		if (tag.authorID !== message.author.id && !staffRole) return message.util.reply('you can only delete your own tags.');
		await tag.destroy();

		return message.util.reply(`successfully deleted **${tag.name.substring(0, 256)}**.`);
	}
}

module.exports = TagDeleteCommand;
