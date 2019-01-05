const Discord = require('discord.js');
const qs = require('querystring');

module.exports = {
    name: 'avatar',
    type: 'Info',
    aliases: ['picture'],
	usage: '[optional user]',
	example: ['avatar', 'avatar @Purple', 'avatar 499250383785558026'],
    description: 'Get your or any other user\'s displayAvatar',
    guildOnly: true,

    async execute(message, args, client) {

		let member = message.mentions.members.first() || message.guild.members.get(args[0])

		const embed = new Discord.RichEmbed()
		if (member) embed.setTitle(member.user.tag)
		if (member) embed.setImage(member.user.displayAvatarURL)
		if (member) embed.setURL(member.user.displayAvatarURL)

		if (!member) embed.setTitle(message.author.tag)
		if (!member) embed.setImage(message.author.displayAvatarURL)
		if (!member) embed.setURL(message.author.displayAvatarURL)

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
    }
}