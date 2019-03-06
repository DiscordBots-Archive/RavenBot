const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class GuildMemberRemoveListener extends Listener {
	constructor() {
		super('guildMemberRemove', {
			emitter: 'client',
			event: 'guildMemberRemove',
			category: 'client'
		});
	}

	async exec(member) {

		const memberLog = this.client.settings.get(member.guild, 'memberLog', undefined);
		if (memberLog) {
			const embed = this.client.util.embed().setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURl())
			.setFooter(`User Left`).setTimestamp().setColor('RED');
			return member.guild.channels.get(memberLog).send(embed);
		}
	}
}

module.exports = GuildMemberRemoveListener;