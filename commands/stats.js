const Discord = require('discord.js');
const os = require('os-utils');
const moment = require('moment');
const duration = require('moment-duration-format');
module.exports = {
    name: 'stats',
    type: 'Utils',
    usage: ' ',
    aliases: ['bot-info'],
	description: 'Statistical information about me!',
    //cooldown: 60,
    botcmd: true,
    
	async execute(message, args, client) {
		let guild = client.guilds.get('524672414261444623');
let member = guild.members.get('444432489818357760');
    
        const duration = moment.duration(client.uptime).
	format("D [days], H [hrs], m [mins], s [secs]");
    
        const embed = new Discord.RichEmbed()

        .setColor('#fcfb04')

        .setTitle(`CLIENT STATISTICS`)
        .setThumbnail(client.user.displayAvatarURL)
	.setURL('https://discordapp.com/oauth2/authorize?client_id=499250383785558026&scope=bot&permissions=2146958847')

        .addField("❯ MEMORY USAGE", `• Using : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`+
        `\n• Free : ${Math.round(os.freemem())} MB`)
    
        .addField('❯ LOAD AVERAGE', "• Avg : " + os.loadavg(10))
    
        .addField("❯ UPTIME", `• ${duration}`)
    
        .addField("❯ SERVER INFO", `\n• Servers : ${client.guilds.size}`)
    
        .addField("❯ USER INFO", `• Users : ${client.users.size}`)
        
        .addField("❯ CHANNEL INFO", `• Total : ${client.channels.size}`)

        .addField("❯ CLIENT INFO", `• Name : ${client.user.tag}`+
        `\n• Creation Date : ${moment(client.user.createdAt).format("DD-MM-YY, kk:mm")}`)

        .setFooter('© 2018 ' + member.user.tag, member.user.displayAvatarURL)
        //.setTimestamp()
    
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
