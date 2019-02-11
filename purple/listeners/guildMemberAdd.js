const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class GuildMemberAddListener extends Listener {
	constructor() {
		super('guildMemberAdd', {
			emitter: 'client',
			event: 'guildMemberAdd',
			category: 'client'
		});
	};

	async exec(member) {

		const embed = new MessageEmbed().setColor('#49ca92')
		.setTitle(`${member.user.tag} | ${member.id}`)
		.setFooter('Joined', member.user.displayAvatarURL()).setTimestamp();

		const channel = this.client.settings.get(member.guild.id, 'memberLog', undefined)
		if (channel) {
			await (this.client.channels.get(channel)).send(embed);
		}
		const autoRole = this.client.settings.get(member.guild.id, 'autoRole', undefined);
		if (autoRole) {
			await member.roles.add(autoRole);
		};
	};
};
module.exports = GuildMemberAddListener;