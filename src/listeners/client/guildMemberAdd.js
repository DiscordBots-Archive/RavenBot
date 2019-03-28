const { Listener } = require('discord-akairo');
const RoleState = require('../../models/Rolestate');

class GuildMemberAddListener extends Listener {
	constructor() {
		super('guildMemberAdd', {
			emitter: 'client',
			event: 'guildMemberAdd',
			category: 'client'
		});
	}

	async exec(member) {
		const roleState = this.client.settings.get(member.guild, 'roleState', undefined);
		if (roleState) {
			const user = await RoleState.findOne({ where: { userID: member.id, guildID: member.guild.id }});
			try {
				if (user) await member.roles.add(user.rolesID, 'Automatic Role State');
			} catch {} // eslint:disable-line
		}

		const memberLog = this.client.settings.get(member.guild, 'memberLog', undefined);
		if (memberLog) {
			const embed = this.client.util.embed().setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
			.setFooter(`User Joined`).setTimestamp().setColor('GREEN');
			return member.guild.channels.get(memberLog).send(embed);
		}
	}
}

module.exports = GuildMemberAddListener;