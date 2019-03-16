const { Listener } = require('discord-akairo');
const Logger = require('../../util/Logger');
const Raven = require('raven');

class ErrorListener extends Listener {
	constructor() {
		super('error', {
			event: 'error',
			emitter: 'commandHandler',
			category: 'commandHandler'
		});
	}

	async exec(error, message, command) {

		Logger.error('An error occured in a command.');

		const tag = message.guild ? `${message.guild.name} :: ${message.author.tag} (${message.author.id})` : `${message.author.tag} (${message.author.id})`;
		Logger.error(message.content, { tag });
		Logger.stacktrace(error);

		Raven.captureBreadcrumb({
			message: 'command_errored',
			category: command ? command.category.id : 'inhibitor',
			data: {
				user: {
					id: message.author.id,
					username: message.author.tag
				},
				guild: message.guild ? {
					id: message.guild.id,
					name: message.guild.name
				} : null,
				command: command ? {
					id: command.id,
					aliases: command.aliases,
					category: command.category.id
				} : null,
				message: {
					id: message.id,
					content: message.content
				}
			}
		});
		Raven.captureException(error);

		if (message.guild ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES') : true) {
			const owner = this.client.users.get(this.client.ownerID).tag;
			message.channel.send([
				'```js',
				error.toString(),
				'```'
			]);
		}
	}
}

module.exports = ErrorListener;
