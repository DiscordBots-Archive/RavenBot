const { Listener } = require('discord-akairo');

class ResumeListener extends Listener {
	constructor() {
		super('resumed', {
			emitter: 'client',
			event: 'resumed',
			category: 'client'
		});
	};

	async exec(events) {
		this.client.logger.info(`[RESUME] (replayed ${events} events)`);
	};
};
module.exports = ResumeListener;