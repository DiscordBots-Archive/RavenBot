const { Listener } = require('discord-akairo');
const { MessageEmbed, WebhookClient } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

class MessageDeleteBulkListener extends Listener {
	constructor() {
		super('messageDeleteBulk', {
			emitter: 'client',
			event: 'messageDeleteBulk',
			category: 'client'
		});
	}

	async exec(messages) {
		if (messages.first().author.bot) return;
		const guildLogs = this.client.settings.get(messages.first().guild, 'guildLog', undefined);
		const webhook = new WebhookClient(process.env.WebhookID, process.env.WebhookToken);

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
			.setThumbnail('https://i.imgur.com/EUGvQJJ.png')
			.setFooter('Bulk Deleted');

		if (guildLogs) {
			this.client.channels.get(guildLogs).send({ embed, files: [{ attachment: Buffer.from(output, 'utf8'), name: 'logs.txt' }] });
		}

		if (webhook) {
			return webhook.send({
				embeds: [embed],
				files: [{ attachment: Buffer.from(output, 'utf8'), name: 'logs.txt' }],
				username: 'Logs: MESSAGE DELETED BULK',
				avatarURL: 'https://i.imgur.com/EUGvQJJ.png'
			});
		}
	}
}

module.exports = MessageDeleteBulkListener;
