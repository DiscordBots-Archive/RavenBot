const { Listener } = require('discord-akairo');
const Logger = require('../../util/Winston');

class DebugListener extends Listener {
	constructor() {
		super('debug', {
			emitter: 'client',
			event: 'debug',
			category: 'client'
		});
	}

	exec(event) {
		Logger.debug(`[DEBUG] ${event}`);
	}
}

module.exports = DebugListener;
