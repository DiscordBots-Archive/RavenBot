const { Command } = require('discord-akairo');
const ReactionRole = require('../../models/ReactionRoles');

class SettingsCommand extends Command {
	constructor() {
		super('settings', {
			aliases: ['settings', 'view-settings'],
			category: 'general',
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			description: { content: 'Displays the guild\'s current settings.' }
		});
	}

	async exec(message) {
		const prefix = this.handler.prefix(message);
		const starboard = this.client.starboards.get(message.guild.id);
		const guildlog = this.client.settings.get(message.guild, 'guildLog', undefined);
		const modlog = this.client.settings.get(message.guild, 'modLogChannel', undefined);
		const memberlog = this.client.settings.get(message.guild, 'memberLog', undefined);
		const modrole = this.client.settings.get(message.guild, 'modRole', undefined);
		const blacklist = this.client.settings.get(message.guild, 'blacklist', []);

		const embed = this.client.util.embed()
			.setColor(0xFFAC33)
			.setTitle('Settings')
			.setDescription([
				`**Prefix**: \`${prefix}\``,
				`**Starboard**: ${(starboard && starboard.channel) || 'None'}`,
				`**GuildLog**: ${message.guild.channels.get(guildlog) || 'None'}`,
				`**ModLog**: ${message.guild.channels.get(modlog) || 'None'}`,
				`**MemberLog**: ${message.guild.channels.get(memberlog) || 'None'}`,
				`**Mod Role**: ${message.guild.roles.get(modrole) || 'None'}`,
				`**Moderation**: ${this.client.settings.get(message.guild, 'moderation', undefined)}`,
				`**Role State**: ${this.client.settings.get(message.guild, 'roleState', undefined)}`,
				`**Threshold**: ${(starboard && starboard.threshold) || 'None'}`,
				`**Blacklist**: ${blacklist.join(', ') || 'None'}`
			]);
		return message.util.send({ embed });
	}
}

module.exports = SettingsCommand;
