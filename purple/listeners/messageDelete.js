const { Listener } = require('discord-akairo');
const { MessageEmbed, WebhookClient } = require('discord.js');

class MessageDeleteListener extends Listener {
	constructor() {
		super('messageDelete', {
			emitter: 'client',
			event: 'messageDelete',
			category: 'client'
		});
	};

	async exec(message) {
		if (message.author.bot) return;
		if (message.author.id === this.client.ownerID) return;
		if (!message.content) return;
		const guildLogs = this.client.settings.get(message.guild.id, 'guildLog', undefined);
		const WebhookID = this.client.settings.get(message.guild.id, 'WebhookID', undefined)
		const WebhookToken = this.client.settings.get(message.guild.id, 'WebhookToken', undefined)
		if (guildLogs && WebhookID && WebhookToken) {
            const webhook = new WebhookClient(WebhookID, WebhookToken);
			if (!webhook) return;
			const attachment = message.attachments.first();
			const embed = new MessageEmbed().setColor(0x824aee)
				.setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
				.addField('❯ Channel', message.channel)
				.addField('❯ Message', `${message.content.substring(0, 1020)}`);
			if (attachment) embed.addField('❯ Attachment(s)', attachment.url);
			embed.setTimestamp(new Date());
			embed.setFooter('Deleted');
			
			return webhook.send({
				embeds: [embed],
				username: 'Logs: MESSAGE DELETED',
				avatarURL: 'https://i.imgur.com/EUGvQJJ.png'
			});
		};
	};
};
module.exports = MessageDeleteListener;
