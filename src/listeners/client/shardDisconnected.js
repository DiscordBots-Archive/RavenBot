const { Listener } = require('discord-akairo');
const Logger = require('../../util/Logger');

class ShardDisconnectListener extends Listener {
	constructor() {
		super('shardDisconnected', {
			emitter: 'client',
			event: 'shardDisconnected',
			category: 'client'
		});
	}

	exec(event, id) {
		Logger.warn(`SHARD ${id} DISCONNECTED (${event.code})`, { tag: 'SHARD DISCONNECTED' });
	}
}

module.exports = ShardDisconnectListener;
