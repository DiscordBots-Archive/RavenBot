const { Listener } = require('discord-akairo');
const { MessageEmbed, Util, WebhookClient } = require('discord.js');
const diff = require('diff');

class MessageUpdateListener extends Listener {
	constructor() {
		super('messageUpdate', {
			emitter: 'client',
			event: 'messageUpdate',
			category: 'client'
		});
	}

	async exec(oldMessage, newMessage) {
		if (oldMessage.author.bot || newMessage.author.bot) return;
		if (oldMessage.author.id === this.client.ownerID) return;
		if (newMessage.author.id === this.client.ownerID) return;
		if (Util.escapeMarkdown(oldMessage.content) === Util.escapeMarkdown(newMessage.content)) return;
		const guildLogs = this.client.settings.get(newMessage.guild.id, 'guildLog', undefined);
		const WebhookID = this.client.settings.get(newMessage.guild.id, 'WebhookID', undefined);
		const WebhookToken = this.client.settings.get(newMessage.guild.id, 'WebhookToken', undefined);
		if (guildLogs && WebhookID && WebhookToken) {
            const webhook = new WebhookClient(WebhookID, WebhookToken);
			if (!webhook) return;
			const embed = new MessageEmbed()
				.setColor(0x306bff)
				.setAuthor(`${newMessage.author.tag} (${newMessage.author.id})`, newMessage.author.displayAvatarURL())
				.addField('❯ Channel', newMessage.channel);
			let msg = '';
			if (/```(.*?)```/s.test(oldMessage.content) && /```(.*?)```/s.test(newMessage.content)) {
				const strippedOldMessage = oldMessage.content.match(/```(?:(\S+)\n)?\s*([^]+?)\s*```/)[2];
				const strippedNewMessage = newMessage.content.match(/```(?:(\S+)\n)?\s*([^]+?)\s*```/)[2];
				if (strippedOldMessage === strippedNewMessage) return;
				const diffMessage = diff.diffLines(strippedOldMessage, strippedNewMessage, { newlineIsToken: true });
				for (const part of diffMessage) {
					if (part.value === '\n') continue;
					const d = part.added ? '+ ' : part.removed ? '- ' : '';
					msg += `${d}${part.value.replace(/\n/g, '')}\n`;
				};
				const prepend = '```diff\n';
				const append = '\n```';
				embed.addField('❯ Message', `${prepend}${msg.substring(0, 1000)}${append}`);
			} else {
				const diffMessage = diff.diffWords(Util.escapeMarkdown(oldMessage.content), Util.escapeMarkdown(newMessage.content));
				for (const part of diffMessage) {
					const markdown = part.added ? '**' : part.removed ? '~~' : '';
					msg += `${markdown}${part.value}${markdown}`;
				};
				embed.addField('❯ Message', `${msg.substring(0, 1020)}` || '\u200b');
			};
			embed.addField('❯ Message', `[Jump To](${newMessage.url})`, true);
			embed.setTimestamp(oldMessage.editedAt || newMessage.editedAt || new Date());
			embed.setFooter('Edited');

			return webhook.send({
				embeds: [embed],
				username: 'Logs: MESSAGE UPDATED',
				avatarURL: 'https://i.imgur.com/wnC4KmC.png'
			});
		};
	};
};
module.exports = MessageUpdateListener;