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

		const toBeDeleted = await ReactionRole.findAll({ where: { guildID: message.guild.id }});
		for (const channel of toBeDeleted) {
			if (!this.client.channels.has(channel.channelID)) {
				await ReactionRole.destroy({ where: { guildID: message.guild.id, channelID: channel.channelID }});
			}
		}
		const allReaction = await ReactionRole.findAll({ where: { guildID: message.guild.id }});
		const data = await Promise.all(allReaction.map(async row => {
			const channel = await this.client.channels.get(row.channelID);
			const msg = await channel.messages.fetch(row.messageID).catch(() => ( { msg: row.messageID } ));
			return { channel: channel, message: msg, emoji: row.emoji };
		}))

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
		if (data.length) {
			const desc = data.map(({ channel, message, emoji }, index) => `${1 + index}. \\${emoji} ${message.url ? `[Jump To](${message.url}) ${channel}` : `${message.msg} (msg deleted)` }`)
			embed.addField('Reaction Roles', desc)
		}

		return message.util.send({ embed });
	}
}

module.exports = SettingsCommand;
