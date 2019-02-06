/*const { Listener } = require('discord-akairo');

class GuildBanAddListener extends Listener {
	constructor() {
		super('guildBanAdd', {
			emitter: 'client',
			event: 'guildBanAdd',
			category: 'client'
		});
	}

	async exec(guild, user) {
		if (!this.client.settings.get(guild.id, 'moderation', undefined)) return;
		//if (this.client.cachedCases.delete(`${guild.id}:${user.id}:BAN`)) return;
		const totalCases = this.client.settings.get(guild.id, 'caseTotal', 0) + 1;
		this.client.settings.set(guild.id, 'caseTotal', totalCases);
		const modLogChannel = this.client.settings.get(guild.id, 'modLogChannel', undefined);
		let modMessage;
		if (modLogChannel) {
			// @ts-ignore
			const prefix = this.client.commandHandler.prefix({ guild });
			const reason = `Not Provided`;
			const embed = this.client.logEmbed({ member: user, action: 'Ban', caseNum: totalCases, reason }).setColor(this.client.CONSTANTS.COLORS.BAN);
			modMessage = await (this.client.channels.get(modLogChannel)).send(embed);
		}

	}
}
module.exports = GuildBanAddListener;*/
