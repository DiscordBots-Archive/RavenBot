const { Command, Control } = require('discord-akairo');

class TagAliasCommand extends Command {
	constructor() {
		super('tag-alias', {
			aliases: ['tag-alias'],
			category: 'tags',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'first',
					type: 'tag',
					prompt: {
						start: `what's the tag you want to alias?`,
						retry: (msg, args, { phrase }) => `a tag with the name **${phrase}** does not exist.`
					}
				},
				{
					id: 'add',
					match: 'flag',
					flag: '--add'
				},
				{
					id: 'del',
					match: 'flag',
					flag: '--del'
				},
				Control.if((_, args) => args.add, [
					{
						id: 'second',
						match: 'rest',
						type: 'existingTag',
						prompt: {
							start: `what's the alias you want to apply to this tag?`,
							retry: (msg, args, { phrase }) => `a tag with the name **${phrase}** already exists.`
						}
					}
				], [
					{
						id: 'second',
						match: 'rest',
						type: 'string',
						prompt: {
							start: `what's the alias you want to apply to this tag?`,
							retry: (msg, args, { phrase }) => `a tag with the name **${phrase}** already exists.`
						}
					}
				])
			],
			description: {
				usage: '<--add/--del> <tag> <tagalias>',
				examples: ['--add Test1 Test2', '--del "Test 2" "Test 3"', '"Test 3" "Test 4" --add']
			}
		});
	}

	async exec(message, { first, second, add, del }) {

		const new_alias = await first.aliases.concat([second]);

		if (add) {
			if (second && second.length >= 256) {
				return message.util.reply('messages have a limit of 256 characters!');
			}
			await first.update({ aliases: new_alias, last_modified: message.author.id });

		} else if (del) {
			const removed_alias = await first.aliases.filter(id => id !== second);
			await first.update({ aliases: removed_alias, last_modified: message.author.id });

		} else {
			return message.util.reply('you have to either supply `--add` or `--del`');
		}

		return message.util.reply(`alias **${second.substring(0, 256)}** ${add ? 'added to' : 'deleted from'} tag **${first.name}**.`);
	}
}

module.exports = TagAliasCommand;