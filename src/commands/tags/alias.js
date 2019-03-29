const { Command } = require('discord-akairo');
const Tags = require('../../models/Tags');

class TagAliasCommand extends Command {
	constructor() {
		super('tag-alias', {
			aliases: ['tag-alias'],
			category: 'tags',
			channel: 'guild',
			ratelimit: 2,
			flags: ['--add', '--del', '--delete'],
			description: {
				usage: '<--add/--del> <tag> <tagalias>',
				examples: ['--add Test1 Test2', '--del "Test 2" "Test 3"', '"Test 3" "Test 4" --add']
			}
		});
	}
	
	async *args() {
		const first = yield {
			type: 'tag',
			prompt: {
				start: `what's the tag you want to alias?`,
				retry: (msg, { phrase }) => `a tag with the name **${phrase}** does not exist.`
			}
		};
		const add = yield {
			match: 'flag',
			flag: ['--add']
		};
		const del = yield {
			match: 'flag',
			flag: ['--del', '--delete']
		};
		const second = yield (
			add ?
			{
				match: 'rest',
				type: 'existingTag',
				prompt: {
					start: `what's the alias you want to apply to this tag?`,
					retry: (msg, { phrase }) => `a tag with the name **${phrase}** already exists.`
				}
			} :
			{
				match: 'rest',
				type: 'string',
				prompt: {
					start: `what's the alias you want to remove from this tag?`,
					retry: (msg, { phrase }) => `a tag with the name **${phrase}** already exists.`
				}
			}
		)
		return { first, second, add, del };
	}

	async exec(message, { first, second, add, del }) {

		const point = await Tags.findOne({ where: { name: first.name } });
		const new_alias = await point.aliases.concat([second]);

		if (add) {
			if (second && second.length >= 256) {
				return message.util.reply('messages have a limit of 256 characters!');
			}
			await Tags.update({ aliases: new_alias, last_modified: message.author.id }, { where: { name: first.name } });

		} else if (del) {
			const removed_alias = await point.aliases.filter(id => id !== second);
			await Tags.update({ aliases: removed_alias, last_modified: message.author.id }, { where: { name: first.name } });

		} else {
			return message.util.reply('you have to either supply `--add` or `--del`');
		}

		return message.util.reply(`alias **${second.substring(0, 256)}** ${add ? 'added to' : 'deleted from'} tag **${first.name}**.`);
	}
}

module.exports = TagAliasCommand;