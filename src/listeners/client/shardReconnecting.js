const { Listener } = require('discord-akairo');
const Logger = require('../../util/Logger');

class ShardReconnectListener extends Listener {
	constructor() {
		super('shardReconnecting', {
			emitter: 'client',
			event: 'shardReconnecting',
			category: 'client'
		});
	}

	exec(id) {
		Logger.info(`SHARD ${id} RECONNECTING`, { tag: 'SHARD RECONNECTING' });
	}
}

module.exports = ShardReconnectListener;
