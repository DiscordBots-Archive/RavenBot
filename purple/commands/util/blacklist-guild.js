const { Command } = require('discord-akairo');

class BlacklistGuildCommand extends Command {
	constructor() {
		super('blacklist-guild', {
			description: {
				content: 'Prohibit/Allow a server from using Purple',
				usage: '<guild.id>',
				examples: ['444432489818357760']
			},
			category: 'util',
			ownerOnly: true,
			ratelimit: 2,
			args: [
				{
					id: 'guild',
					match: 'content',
					type: 'guild',
					prompt: {
						start: message => `${message.author}, which server would you like to blacklist/unblacklist?`
					}
				}
			]
		});
	};

	async exec(message, { guild }) {
		const blacklist = this.client.settings.get('global', 'blacklist-guild', []);
		if (blacklist.includes(guild.id)) {
			const index = blacklist.indexOf(guild.id);
			blacklist.splice(index, 1);
			if (blacklist.length === 0) this.client.settings.delete('global', 'blacklist-guild');
			else this.client.settings.set('global', 'blacklist-guild', blacklist);

			return message.util.send(`*${guild.name}, have you realized Purple's greatness? You've got good eyes~*`);
		};

		blacklist.push(guild.id);
		this.client.settings.set('global', 'blacklist-guild', blacklist);

		return message.util.send(`*${guild.name}, you are not worthy of Purple's luck~*`);
	};
};
module.exports = BlacklistGuildCommand;