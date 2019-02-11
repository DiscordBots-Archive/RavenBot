const { Listener } = require('discord-akairo');

class DisconnectListener extends Listener {
	constructor() {
		super('disconnect', {
			emitter: 'client',
			event: 'disconnect',
			category: 'client'
		});
	};

	async exec(event) {
		
		this.client.logger.warn(`[DISCONNECT] (${event.code})`);
	};
};
module.exports = DisconnectListener;