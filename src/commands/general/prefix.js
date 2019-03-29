const { Argument, Command, Control } = require('discord-akairo');

class PrefixCommand extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix'],
			category: 'general',
			channel: 'guild',
			quoted: false,
			description: {
				content: [
					'Displays or changes the prefix of the guild.',
					'The prefix must not contain spaces and be below 5 characters.'
				],
				usage: '<prefix>',
				examples: ['!', '?']
			}
		});
	}

	async *args(msg) {
		const method = yield {
			match: 'content'
		};
		const prefix = yield (
			msg.member.roles.has(this.client.settings.get(msg.guild, 'modRole', undefined)) && method ?
			{
				type: Argument.validate('string', (_, p) => !/\s/.test(p) && p.length <= 5),
				prompt: {
					retry: `please provide a prefix without spaces and less than 5 characters` 
				}
			}:
			{
				type: (msg, phrase) => false
			}
		)
		return { prefix };
	}

	async exec(message, { prefix }) {

		if (!prefix) return message.util.send(`The current prefix for this guild is: \`${this.handler.prefix(message)}\``);
		this.client.settings.set(message.guild, 'prefix', prefix);
		if (prefix === this.handler.prefix(message)) {
			return message.util.reply(`the prefix has been reset to \`${prefix}\``);
		}
		return message.util.reply(`the prefix has been set to \`${prefix}\``);
	}
}

module.exports = PrefixCommand;