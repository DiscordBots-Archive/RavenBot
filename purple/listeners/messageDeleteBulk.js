const { Listener } = require('discord-akairo');
const { MessageEmbed, WebhookClient } = require('discord.js');
const moment = require('moment');
const duration = require('moment-duration-format');

class MessageDeleteBulkListener extends Listener {
	constructor() {
		super('messageDeleteBulk', {
			emitter: 'client',
			event: 'messageDeleteBulk',
			category: 'client'
		});
	};

	async exec(messages) {
		if (messages.first().author.bot) return;
		const guildLogs = this.client.settings.get(messages.first().guild.id, 'guildLog', undefined);
		const WebhookID = this.client.settings.get(messages.first().guild.id, 'WebhookID', undefined);
		const WebhookToken = this.client.settings.get(messages.first().guild.id, 'WebhookToken', undefined);
		if (guildLogs && WebhookID && WebhookToken) {
            const webhook = new WebhookClient(WebhookID, WebhookToken);
			if (!webhook) return;
			const output = messages.reduce((out, msg) => {
				const attachment = msg.attachments.first();
				out += `[${moment.utc(msg.createdTimestamp).format('YYYY/MM/DD hh:mm:ss')}] ${msg.author.tag} (${msg.author.id}): ${msg.cleanContent ? msg.cleanContent.replace(/\n/g, '\r\n') : ''}${attachment ? `\r\n${attachment.url}` : ''}\r\n`;
				return out;
			}, '');
			const embed = new MessageEmbed()
				.setColor(0x824aee)
				.setAuthor(`${messages.first().author.tag} (${messages.first().author.id})`, messages.first().author.displayAvatarURL())
				.addField('❯ Logs', 'See attachment file for full logs (possibly above this embed)')
				.setTimestamp(new Date())
				.setFooter('Bulk Deleted');

			return webhook.send({
				embeds: [embed],
				files: [{ attachment: Buffer.from(output, 'utf8'), name: 'logs.txt' }],
				username: 'Logs: MESSAGE DELETED BULK',
				avatarURL: 'https://i.imgur.com/EUGvQJJ.png'
			});
		};
	};
};
module.exports = MessageDeleteBulkListener;