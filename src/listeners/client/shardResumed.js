const { Listener } = require('discord-akairo');
const Logger = require('../../util/Logger');

class ShardResumedListener extends Listener {
	constructor() {
		super('shardResumed', {
			emitter: 'client',
			event: 'shardResumed',
			category: 'client'
		});
	}

	exec(id) {
		Logger.info(`SHARD ${id} RESUMED`, { tag: 'SHARD RESUMED' });
	}
}

module.exports = ShardResumedListener;
