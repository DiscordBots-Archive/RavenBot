const { Command } = require('discord-akairo');

class DisableCommand extends Command {
	constructor() {
		super('delete-log', {
			aliases: ['disable', 'disable-log', 'toggle'],
			description: {
				content: `*Available Methods:*\n` +
				`• modlog\n` +
				`• memberlog\n` +
				`• guildlog`,
				usage: '<method>',
				examples: [
					'modlog',
					'memberlog',
					'guildlog'
				]
			},
			category: 'config',
			channel: 'guild',
			userPermissions: ['MANAGE_GUILD'],
			ratelimit: 2,
			args: [
				{
					id: 'method',
					type: ['modlog', 'memberlog', 'guildlog']
				},

			]
		});
	};

	async exec(message, { method, name }) {

		if (!method) return;

		const command = ({
			modlog: this.handler.modules.get('toggle-modlog'),
            memberlog: this.handler.modules.get('toggle-memberlog'),
			guildlog: this.handler.modules.get('toggle-guildlog'),
		})[method];

		return this.handler.handleDirectCommand(message, name, command, true);
	};
};
module.exports = DisableCommand;
