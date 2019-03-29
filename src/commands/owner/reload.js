const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class ReloadCommand extends Command {
	constructor() {
		super('reload', {
			aliases: ['reload', 'r'],
			category: 'owner',
			ownerOnly: true,
			quoted: false,
			description: {
				content: 'Reloads a module or all modules at once.',
				usage: '<module> [type:]'
			}
		});
	}

	async *args() {
		const type = yield {
			type: [['command', 'c'], ['inhibitor', 'i'], ['listener', 'l']]
		};
		const module = yield {
			type: (msg, phrase) => {
				if (!phrase) return null;
				const resolver = this.handler.resolver.type({
					command: 'commandAlias',
					inhibitor: 'inhibitor',
					listener: 'listener'
				}[type]);
				return resolver(msg, phrase);
			}
		}
		return { type, module };
	}

	async exec(message, { type, module: mod }) {
		if (!type) {
			const  inhibitor = this.client.inhibitorHandler.removeAll() && this.client.inhibitorHandler.loadAll();
			const listener = this.client.listenerHandler.removeAll() && this.client.listenerHandler.loadAll();
			const command = this.client.commandHandler.removeAll() && this.client.commandHandler.loadAll();

			if (inhibitor && listener && command) {
				const cmd = await this.client.commandHandler.modules.size;
				const listener = await this.client.listenerHandler.modules.size;
				const inhibitor = await this.client.inhibitorHandler.modules.size;
				return message.util.send(`Reloaded: ${cmd} commands ${listener} listeners ${inhibitor} inhibitors`, {code: 'js'});
			}
		}

		if (!mod) {
			return message.util.reply(`Invalid ${type} ${type === 'command' ? 'alias' : 'ID'} specified to reload.`);
		}

		try {
			mod.reload();
			return message.util.reply(`Sucessfully reloaded ${type} \`${mod.id}\`.`);
		} catch (err) {
			Logger.error(`Error occured reloading ${type} ${mod.id}`);
			return message.util.reply(`Failed to reload ${type} \`${mod.id}\`.`);
		}
	}
}

module.exports = ReloadCommand;