const { Command } = require('discord-akairo');

class UtilCommand extends Command {
	constructor() {
		super('util-cmd', {
			aliases: ['util', 'u'],
			description: {
				content: 'Get the list of total list guilds and users',
				usage: '<users / guilds>',
				examples: ['users', 'guilds']
			},
			category: 'util',
			ratelimit: 2,
			clientPermissions: ['ATTACH_FILES'],
            ownerOnly: true,
			args: [
				{
					id: 'method',
					type: ['users', 'guilds']
				},

			]
		});
	}

	async exec(message, { method, name }) {

        if (!method) return; 

		const command = ({
			users: this.handler.modules.get('users'),
            guilds: this.handler.modules.get('guilds'),
		})[method];

		return this.handler.handleDirectCommand(message, name, command, true);
	}
}
module.exports = UtilCommand;