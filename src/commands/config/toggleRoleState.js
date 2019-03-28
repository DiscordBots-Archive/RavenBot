const { Command } = require('discord-akairo');
const RoleState = require('../../models/Rolestate');

class ToggleRoleStateCommand extends Command {
	constructor() {
		super('toggle-role-state', {
			aliases: ['role-state'],
			category: 'config',
			channel: 'guild',
			userPermissions: ['MANAGE_GUILD'],
			ratelimit: 2,
			description: { content: 'Toggle role state on the server.' }
		});
	}

	async exec(message) {
		const roleState = this.client.settings.get(message.guild, 'roleState', undefined);
		if (roleState) {
			this.client.settings.set(message.guild, 'roleState', false);
			await RoleState.destroy({ where: { guildID: message.guild.id }});
			return message.util.reply('successfully removed all records!');
		}
		
		this.client.settings.set(message.guild, 'roleState', true);
		const members = await message.guild.members.fetch();
		for (const member of members.values()) {
			const roles = member.roles.filter(role => role.id !== message.guild.id).map(role => role.id);
			await RoleState.create({
				guildID: message.guild.id,
				userID: member.id,
				rolesID: roles
			})
		}

		return message.util.reply('successfully inserted all the records!');
	}
}

module.exports = ToggleRoleStateCommand;