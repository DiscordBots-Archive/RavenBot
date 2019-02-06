const { Command } =  require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = ('common-tags');
const moment = require('moment');
const duration = require('moment-duration-format');

const HUMAN_LEVELS = ({
	0: 'None',
	1: 'Low',
	2: 'Medium',
	3: '(╯°□°）╯︵ ┻━┻',
	4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
});

class ServerInfoCommand extends Command {
	constructor() {
		super('server-info', {
			aliases: ['server', 'server-info'],
			description: {
				content: 'Get info on the server.'
			},
			category: 'info',
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS', 'VIEW_AUDIT_LOG'],
			typing: true,
			ratelimit: 2
		});
	}

	async exec(message) {

		const members = await message.guild.members.fetch();
		const bot = members.filter(m => m.user.bot).size;

		const embed = new MessageEmbed()
			.setColor('#f6ff5c')
			.setAuthor(`${message.guild.name} | ${message.guild.id}`).setFooter(message.author.tag, message.author.displayAvatarURL())

			.addField('❯ General Info',
				`• Members: ${message.guild.memberCount}\n` +
				`• Bots: ${bot}\n` +
				`• Roles: ${message.guild.roles.size}`)
			.addField('❯ Channels Info',
				`• ${message.guild.channels.filter(ch => ch.type === 'text').size} Text, ${message.guild.channels.filter(ch => ch.type === 'voice').size} Voice\n` +
				`• AFK: ${message.guild.afkChannelID ? `<#${message.guild.afkChannelID}> after ${message.guild.afkTimeout / 60}min` : 'None'}`)
			.addField('❯ Other',
				`• Region: ${message.guild.region.toUpperCase()}\n` +
				`• Created at: ${moment.utc(message.guild.createdAt).format('DD-MM-YY kk:mm')}\n` +
				`• Owner: ${message.guild.owner.user.tag} (${message.guild.ownerID})\n` +
				`• Verification Level: ${HUMAN_LEVELS[message.guild.verificationLevel]}`)
			.setThumbnail(message.guild.iconURL());

		return message.util.send(embed);
	}
}
module.exports = ServerInfoCommand;
