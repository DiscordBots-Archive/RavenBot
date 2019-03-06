const { Command } = require('discord-akairo');
const Tags = require('../../models/Tags');

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
						start: `what tag do you want to delete?`,
						retry: (message, _, provided, phrase) => `a tag with the name **${provided.phrase}** does not exist.`
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
		const Repo = await Tags.findOne({ where: { name: tag.name } });
		await Repo.destroy();

		return message.util.reply(`successfully deleted **${tag.name.substring(0, 1900)}**.`);
	}
}

module.exports = TagDeleteCommand;