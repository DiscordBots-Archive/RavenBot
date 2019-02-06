const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client'
		});
	}

	async exec() {

		this.client.logger.info(`[READY] ${this.client.user.tag} (${this.client.user.id})`);
		
		const countChannel = this.client.settings.get(this.client.user.id, 'countChannel', undefined);
		if (countChannel) {
			let channel = this.client.channels.get(countChannel);
			channel.messages.fetch(channel.lastMessageID).then(async msg => {
				await this.client.settings.set(channel.id, 'authorID', msg.author.id)
				await this.client.settings.set(channel.id, 'messageContent', msg.content)
			}).catch(error => {})
		}
	}
}
module.exports = ReadyListener;
