const { Listener } = require('discord-akairo');

class MessageListener extends Listener {
	constructor() {
		super('message', {
			emitter: 'client',
			event: 'message',
			category: 'client'
		});
	}

	async exec() {
		this.client.prometheus.messagesCounter.inc();
	}
}

module.exports = MessageListener;
