const { Command } = require('discord-akairo');

class UtilCommand extends Command {
	constructor() {
		super('util-cmd', {
			aliases: ['stats', 'util', 'u'],
			description: {
				content: 'Displays statistics about me',
				usage: '<users / guilds>',
				examples: ['users', 'guilds']
			},
			category: 'util',
			ratelimit: 2,
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					id: 'method',
					type: ['users', 'guilds', 'download', 'main']
				},

			]
		});
	}

	async exec(message, { method, name }) {

		const command_ = this.handler.modules.get('stats-cmd');
        if (!method) return this.handler.handleDirectCommand(message, name, command_, true);

		const command = ({
			users: this.handler.modules.get('users'),
			guilds: this.handler.modules.get('guilds'),
			download: this.handler.modules.get('dlstats'),
			main: this.handler.modules.get('dlstats'),
		})[method];

		return this.handler.handleDirectCommand(message, name, command, true);
	}
}
module.exports = UtilCommand;