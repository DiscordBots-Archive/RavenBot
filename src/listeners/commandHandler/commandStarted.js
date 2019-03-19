const { Listener } = require('discord-akairo');
const Logger = require('../../util/Logger');
const Raven = require('raven');
const Levels = require('../../models/UserLevel');
const Commands = require('../../models/Commands');

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

		if (message.guild) {
			const _command = await Commands.findOne({ where: { guildID: message.guild.id, commandID: command.id }});
			if (_command) {
				await Commands.update({ uses: _command.uses + 1 }, { where: { guildID: message.guild.id, commandID: command.id }});
			} else await Commands.create({ commandID: command.id, guildID: message.guild.id, uses: 1 });
			
			const _user = await Levels.findOne({ where: { guildID: message.guild.id, userID: message.author.id }});
			if (_user) {
				await Levels.update({ uses: _user.uses + 1 }, { where: { guildID: message.guild.id, userID: message.author.id }});
			} else await Levels.create({ guildID: message.guild.id, userID: message.author.id, uses: 1 });
		}

		const tag = message.guild ? `${message.guild.name} - ${message.author.tag}` : `${message.author.tag}`;
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
