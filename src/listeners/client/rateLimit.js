const { Listener } = require('discord-akairo');
const Logger = require('../../util/Logger');

class RateLimitListener extends Listener {
	constructor() {
		super('rateLimit', {
			event: 'rateLimit',
			emitter: 'client',
			category: 'client'
		});
	}

	exec({ timeout, limit, method, path, route }) {
		const warn = { timeout, limit, method, path, route };
		Logger.warn(warn, { tag: 'RATE LIMIT' });
	}
}

module.exports = RateLimitListener;
