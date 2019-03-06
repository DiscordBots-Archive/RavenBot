const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class MessageDeleteListener extends Listener {
	constructor() {
		super('messageDelete', {
			emitter: 'client',
			event: 'messageDelete',
			category: 'client'
		});
	}

	async exec(message) {

		if (message.author.bot) return;
		if (!message.content) return;
		const guildLogs = this.client.settings.get(message.guild, 'guildLog', undefined);
		if (guildLogs) {
			const attachment = message.attachments.first();
			const embed = new MessageEmbed().setColor(0x824aee)
				.setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
				.addField('❯ Channel', message.channel).setThumbnail('https://i.imgur.com/EUGvQJJ.png')
				.addField('❯ Message', `${message.content.substring(0, 1020)}`);
			if (attachment) embed.addField('❯ Attachment(s)', attachment.url);
			embed.setTimestamp(new Date());
			embed.setFooter('Message Deleted');
			
			return this.client.channels.get(guildLogs).send({embed});
		}
	}
}

module.exports = MessageDeleteListener;
