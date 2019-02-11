const { Listener } = require('discord-akairo');
const moment = require('moment');

class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client'
		});
	};

	async exec() {

		this.client.logger.info(`[READY] ${this.client.user.tag} (${this.client.user.id})`);
		
		const countChannel = this.client.settings.get(this.client.user.id, 'countChannel', undefined);
		if (countChannel) {
			let channel = this.client.channels.get(countChannel);
			channel.messages.fetch(channel.lastMessageID).then(async msg => {
				await this.client.settings.set(channel.id, 'authorID', msg.author.id);
				await this.client.settings.set(channel.id, 'messageContent', msg.content);
			}).catch(error => {});
		};

		setInterval(async () => {
			for (const guild of this.client.guilds.values()) {
				const mutes = await this.client.Mute.findAll({where: {guild: guild.id}},{ attributes: ['time'] });
				for (const mute of mutes) {
					if (mute.time <= Date.now()) {
						const member = guild.members.get(mute.user);
						const role = this.client.settings.get(guild.id, 'muteRole', undefined);
						await member.roles.remove(role).then(() => {
							this.client.Mute.destroy({where: {user: member.user.id}});
						});
					};
				};
			};
		}, 300000);
	};
}
module.exports = ReadyListener;
