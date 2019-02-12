const { Command } = require('discord-akairo');

class BlacklistCommand extends Command {
	constructor() {
		super('blacklist', {
			aliases: ['blacklist', 'unblacklist'],
			description: {
				content: 'Prohibit/Allow a user/guild from using Purple',
				usage: '<user>/<guild>',
				examples: ['user 444432489818357760', 'guild 524672414261444623']
			},
			category: 'util',
            ratelimit: 2,
            ownerOnly: true,
			args: [
				{
					id: 'method',
					type: ['user', 'guild']
                },
                {
                    id: 'name',
                    match: 'rest',
                    default: ''
                }
			]
		});
	};

	async exec(message, { method, name }) {

        if (!method) return;

		const command = ({
			user: this.handler.modules.get('blacklist-user'),
			guild: this.handler.modules.get('blacklist-guild'),
			server: this.handler.modules.get('blacklist-guild'),
		})[method];

		return this.handler.handleDirectCommand(message, name, command, true);
	};
};
module.exports = BlacklistCommand;