const { Listener } = require('discord-akairo');

class ReconnectListener extends Listener {
	constructor() {
		super('reconnecting', {
			emitter: 'client',
			event: 'reconnecting',
			category: 'client'
		});
	}

	async exec() {
		this.client.logger.info("[RECONNECTING]");
	}
}
module.exports = ReconnectListener;