const { Command } = require('discord-akairo');

class TagSourceCommand extends Command {
	constructor() {
		super('tag-source', {
			aliases: ['source'],
			category: 'tags',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'file',
					match: 'flag',
					flag: ['--file', '-f']
				},
				{
					id: 'tag',
					match: 'rest',
					type: 'tag',
					prompt: {
						start: 'what tag would you like to see the source of?',
						retry: (msg, { phrase }) => `a tag with the name **${phrase}** does not exist.`
					}
				}
			],
			description: {
				content: 'Displays a tags source (Highlighted with Markdown).',
				usage: '[--file/-f] <tag>'
			}
		});
	}

	exec(message, { tag, file }) {
		return message.util.send(tag.content, {
			code: 'md',
			// eslint-disable-next-line multiline-ternary
			files: file ? [{
				attachment: Buffer.from(tag.content.replace(/\n/g, '\r\n'), 'utf8'), name: `${tag.name}_source.txt`
			}] : undefined
		});
	}
}

module.exports = TagSourceCommand;
