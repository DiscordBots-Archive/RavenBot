const { Listener } = require('discord-akairo');

class MessageListener extends Listener {
	constructor() {
		super('message', {
			emitter: 'client',
			event: 'message',
			category: 'client'
		});
	};

	async exec(message) {

		this.client.prometheus.messagesCounter.inc();

		const Channel = this.client.settings.get(message.guild.id, 'countChannel', undefined);
		if (Channel) {
			let channel = this.client.channels.get(Channel);
			const authorID = await this.client.settings.get(channel.id, 'authorID', undefined);
			const authormsg = await this.client.settings.get(channel.id, 'messageContent', undefined);
			if (message.channel.id === channel.id) {
				if (message.author.id !== authorID && !isNaN(message.content) && parseInt(message.content) === parseInt(authormsg) + 1) {
					await this.client.settings.set(channel.id, 'authorID', message.author.id);
					await this.client.settings.set(channel.id, 'messageContent', message.content);
				};
				if (message.author.id === authorID || isNaN(message.content) || parseInt(message.content) !== parseInt(authormsg) + 1) {
					setTimeout(() => {
						message.delete();
					}, 1000);
				};
			};
		};
	};
};
module.exports = MessageListener;