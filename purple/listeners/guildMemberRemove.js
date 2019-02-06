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

		const embed = new MessageEmbed().setColor('#fa0d0d')
		.setTitle(`${member.user.tag} | ${member.id}`)
		.setFooter('Left', member.user.displayAvatarURL()).setTimestamp()

		const channel = this.client.settings.get(member.guild.id, 'memberLog', undefined)
		if (channel) {
			await (this.client.channels.get(channel)).send(embed);
		}
	}
}
module.exports = GuildMemberRemoveListener;