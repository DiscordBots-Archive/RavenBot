const { Listener } = require('discord-akairo');
//const Raven = require('raven'); // tslint:disable-line

class CommandErrorListener extends Listener {
	constructor() {
		super('error', {
			emitter: 'commandHandler',
			event: 'error',
			category: 'commandHandler'
		});
	}

	exec(error, message, command) {
		this.client.logger.error(`[COMMAND ERROR] ${error.message}`, error.stack);
		console.log(error)
	}
}
module.exports = CommandErrorListener;