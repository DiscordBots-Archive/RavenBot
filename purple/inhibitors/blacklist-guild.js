const { Inhibitor } = require('discord-akairo');

class BlacklistGuildInhibitor extends Inhibitor {
	constructor() {
		super('blacklist-guild', {
			reason: 'blacklist-guild'
		});
	};

	exec(message) {
		const blacklist = this.client.settings.get('global', 'blacklist-guild', []);

		if (message.guild) {
			return blacklist.includes(message.guild.id);
		};
	};
};
module.exports = BlacklistGuildInhibitor;