const { Listener, Command } = require('discord-akairo');
//const Raven = require('raven'); // tslint:disable-line

class CommandStartedListener extends Listener {
	constructor() {
		super('commandStarted', {
			emitter: 'commandHandler',
			event: 'commandStarted',
			category: 'commandHandler'
		});
	}

	exec(message, command, args) {
		this.client.prometheus.commandCounter.inc();
	}
}
module.exports = CommandStartedListener;
