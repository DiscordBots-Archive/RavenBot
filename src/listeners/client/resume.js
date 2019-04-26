const { Listener } = require('discord-akairo');
const Logger = require('../../util/Logger');

class ResumeListener extends Listener {
	constructor() {
		super('resume', {
			emitter: 'client',
			event: 'resume',
			category: 'client'
		});
	}

	exec(events, shardID) {
		Logger.info(`(replayed ${events} events) (Shard ID ${shardID})`, { tag: 'RESUME' });
	}
}

module.exports = ResumeListener;
