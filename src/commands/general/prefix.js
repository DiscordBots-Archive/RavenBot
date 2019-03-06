const { Argument, Command, Control } = require('discord-akairo');

class PrefixCommand extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix'],
			category: 'general',
			channel: 'guild',
			userPermissions: ['MANAGE_GUILD'],
			quoted: false,
			args: [
				{
					id: 'method',
				},
				Control.if((_, args) => args.method, [
					{
						id: 'prefix',
						match: 'content',
						type: Argument.validate('string', p => !/\s/.test(p) && p.length <= 5),
						prompt: {
							retry: `Please provide a prefix without spaces and less than 5 characters`
						}
					}
				])
			],
			description: {
				content: [
					'Displays or changes the prefix of the guild.',
					'The prefix must not contain spaces and be below 5 characters.'
				],
				usage: '<prefix>',
				examples: ['*', '-']
			}
		});
	}

	async exec(message, { prefix }) {

		if (!prefix) return message.util.send(`*The current prefix for this guild is: \`${this.handler.prefix(message)}\`*`);
		this.client.settings.set(message.guild, 'prefix', prefix);
		if (prefix === this.handler.prefix(message)) {
			return message.util.reply(`*the prefix has been reset to \`${prefix}\`*`);
		}
		return message.util.reply(`*the prefix has been set to \`${prefix}\`*`);
	}
}

module.exports = PrefixCommand;
