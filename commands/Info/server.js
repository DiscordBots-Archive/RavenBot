const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
    name: 'server',
    type: 'Info',
    usage: ' ',
    aliases: ['server-info'],
	description: 'It shows your server information',
    cooldown: 60,
    guildOnly: true,
    botcmd: true,

	async execute(message) {
    
        const embed = new Discord.RichEmbed()
        .setDescription(`Info about **${message.guild.name}** (ID: ${message.guild.id})`)
        .setColor('#f3d43d')
        .setFooter(`Requested by ${message.author.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
        .setTimestamp()
    
        .addField("❯ CHANNELS", `• Total: ${message.guild.channels.filter(ch => ch.type === 'text').size + message.guild.channels.filter(ch => ch.type === 'voice').size}`+
        `\n• Category: ${message.guild.channels.size - message.guild.channels.filter(ch => ch.type === 'text').size - message.guild.channels.filter(ch => ch.type === 'voice').size}`+
        `\n${message.guild.channels.filter(ch => ch.type === 'category').map(channels => `\`${channels.name}\``).join(' ')}`+
        `\n• Text: ${message.guild.channels.filter(ch => ch.type === 'text').size}`+
        `\n${message.guild.channels.filter(ch => ch.type === 'text').map(channels => `\`${channels.name}\``).join(' ')}`+
        `\n• Audio: ${message.guild.channels.filter(ch => ch.type === 'voice').size}`+
        `\n${message.guild.channels.filter(ch => ch.type === 'voice').map(channels => `\`${channels.name}\``).join(' ')}`)
    
        .addField('❯ ROLES', `• Roles: ${message.guild.roles.size} \n${message.guild.roles.map(roles => `\`${roles.name}\``).join(' ')}`)
    
        .addField("❯ MEMBERS", `• Total: ${message.guild.memberCount}`+
        `\n• Bots : ${message.guild.members.filter(m => m.user.bot).size}`+
        `\n• Humans: ${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}`+
        `\n• Online: ${message.guild.members.filter(m => m.presence.status === 'online').size + message.guild.members.filter(m => m.presence.status === 'dnd').size + message.guild.members.filter(m => m.presence.status === 'idle').size}`)
    
        .addField("❯ OTHERS", `• Owner: ${message.guild.owner.user.tag} <a:hype:515571561345056783>`+
        `\n• Region: ${message.guild.region.toUpperCase()}`+
        `\n• Created at: ${moment(message.guild.createdAt).format("D-MM-YY, kk:mm")}`)
    
        const msg = await message.channel.send({ embed });
		msg.react('🗑');
		let react;
		try {
			react = await msg.awaitReactions(
				(reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id,
				{ max: 1, time: 10000, errors: ['time'] }
			);
		} catch (error) {
			msg.clearReactions();

			return message;
		}
		react.first().message.delete();

		return message;

	},
};
