const { Listener } = require('discord-akairo');
const RoleState = require('../../models/Rolestate');

class GuildMemberUpdateRoleStateListener extends Listener {
	constructor() {
		super('guildMemberUpdateRoleState', {
			emitter: 'client',
			event: 'guildMemberUpdate',
			category: 'client'
		});
	}

	async exec(_, newMember) {
		const roleState = this.client.settings.get(newMember.guild, 'roleState', undefined);
		if (roleState) {
			await newMember.guild.members.fetch(newMember.id);
			if (newMember.roles) {
				const roles = newMember.roles.filter(role => role.id !== newMember.guild.id).map(role => role.id);
				const Data = await RoleState.findOne({ where: { userID: newMember.id, guildID: newMember.guild.id }});
				if (roles.length) {
					if (Data) {
						await RoleState.update({
							rolesID: roles
						}, { where: { userID: newMember.id, guildID: newMember.guild.id }})
					} else {
						await RoleState.create({
							userID: newMember.id,
							guildID: newMember.guild.id,
							rolesID: roles
						})
					}
				} else {
					if (Data) {
						await Data.destroy();
					}
				}
			}
		}
	}
}

module.exports = GuildMemberUpdateRoleStateListener;