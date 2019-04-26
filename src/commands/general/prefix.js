const { Argument, Command } = require('discord-akairo');

class PrefixCommand extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix'],
			category: 'general',
			channel: 'guild',
			quoted: false,
			args: [
				{
					id: 'prefix',
					type: Argument.validate('string', (_, p) => !/\s/.test(p) && p.length <= 5)
				}
			],
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
