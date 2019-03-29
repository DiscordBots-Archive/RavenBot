const { Command, Control } = require('discord-akairo');
const { Util } = require('discord.js');
const Tags = require('../../models/Tags');
const moment = require('moment');

class TagEditCommand extends Command {
	constructor() {
		super('tag-edit', {
			aliases: ['tag-edit'],
			category: 'tags',
			channel: 'guild',
			ratelimit: 2,
			flags: ['--hoist', '--pin', '--unhoist', '--unpin'],
			description: {
				content: 'Edit a tag (Markdown can be used).',
				usage: '<tag> [--hoist/--unhoist/--pin/--unpin] <content>',
				examples: ['Test Some new content', '"Test 1" Some more new content', 'Test --hoist', '"Test 1" --unpin']
			}
		});
	}

	async *args() {
		const tag = yield {
			type: 'tag',
			prompt: {
				start: 'what tag do you want to edit?',
				retry: (msg, { phrase }) => `a tag with the name **${phrase}** does not exist.`
			}
		};
		const hoist = yield {
			match: 'flag',
			flag: ['--pin', '--hoist']
		};
		const unhoist = yield {
			match: 'flag',
			flag: ['--unpin', '--unhoist']
		};
		const content = yield (
			hoist || unhoist ?
			{
				match: 'rest',
				type: 'tagContent',
			} :
			{
				match: 'rest',
				type: 'tagContent',
				prompt: {
					start: 'what should the new content be?'
				}
			}
		)
		return { tag, hoist, unhoist, content };
	}

	async exec(message, { tag, hoist, unhoist, content }) {
		const staffRole = message.member.roles.has(this.client.settings.get(message.guild, 'modRole', undefined));
		if (tag.authorID !== message.author.id && !staffRole) {
			return message.util.reply('Losers are only allowed to edit their own tags! Hah hah hah!');
		}
		if (content && content.length >= 1950) {
			return message.util.reply('messages have a limit of 2000 characters!');
		}

		await Tags.update({
			hoisted: hoist && staffRole ? true : tag.hoisted || unhoist && staffRole ? false : tag.hoisted,
			content: content ? Util.cleanContent(content, message) : tag.content,
			last_modified: message.author.id,
			updatedAt: moment.utc().toDate()
		}, { where: { name: tag.name } });

		return message.util.reply(`successfully edited **${tag.name}**${hoist && staffRole ? ' to be hoisted.' : '.'}`);
	}
}

module.exports = TagEditCommand;