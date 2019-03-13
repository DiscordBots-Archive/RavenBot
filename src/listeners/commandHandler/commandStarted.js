const { Listener } = require('discord-akairo');
const Logger = require('../../util/Logger');
const Raven = require('raven');

class CommandStartedListener extends Listener {
	constructor() {
		super('commandStarted', {
			event: 'commandStarted',
			emitter: 'commandHandler',
			category: 'commandHandler'
		});
	}

	async exec(message, command, args) {
		this.client.prometheus.commandCounter.inc();

		const tag = message.guild ? `${message.guild.name} :: ${message.author.tag} (${message.author.id})` : `${message.author.tag} (${message.author.id})`;
		Logger.log(`=> ${command.id}`, { tag });

		Raven.captureBreadcrumb({
			message: 'command_started',
			category: command.category.id,
			data: {
				user: {
					id: message.author.id,
					username: message.author.tag
				},
				guild: message.guild ? {
					id: message.guild.id,
					name: message.guild.name
				} : null,
				command: {
					id: command.id,
					aliases: command.aliases,
					category: command.category.id
				},
				message: {
					id: message.id,
					content: message.content
				},
				args
			}
		});
		Raven.setContext({
			user: {
				id: message.author.id,
				username: message.author.tag
			},
			extra: {
				guild: message.guild ? {
					id: message.guild.id,
					name: message.guild.name
				} : null,
				command: {
					id: command.id,
					aliases: command.aliases,
					category: command.category.id
				},
				message: {
					id: message.id,
					content: message.content
				},
				args
			}
		});
	}
}

module.exports = CommandStartedListener;
