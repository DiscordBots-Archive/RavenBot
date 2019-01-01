const Discord = require('discord.js');
const os = require('os-utils');
const moment = require('moment');
const duration = require('moment-duration-format');
module.exports = {
    name: 'stats',
    type: 'Utils',
    aliases: ['client stats, bot info'],
	usage: '',
	description: 'Statistical information about me!',
    cooldown: 60,
    botcmd: true,
    
	async execute(message, args, client) {
    
        const duration = moment.duration(client.uptime).format("D [days], H [hrs], m [mins], s [secs]");
    
        const embed = new Discord.RichEmbed()

        .setColor('#fcfb04')

        .setTitle(`CLIENT INFIORMATION`)
        .setThumbnail(client.user.displayAvatarURL)

        .addField("❯ MEMORY USAGE", `• Using : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`+
        `\n• Free : ${Math.round(os.freemem())} MB`)
    
        .addField('❯ LOAD AVERAGE', "• Avg : " + os.loadavg(10))
    
        .addField("❯ UPTIME", `• ${duration}`)
    
        .addField("❯ SERVER INFO", `\n• Servers : ${client.guilds.size}`)
    
        .addField("❯ USER INFO", `• Users : ${client.users.size}`)
        
        .addField("❯ CHANNEL INFO", `• Total : ${client.channels.size}`)

        .addField("❯ OWNER INFO", `• Owner : SUVAJIT#5580 <a:hype:515571561345056783>`+
        `\n• Creation Date : ${moment(client.user.createdAt).format("DD-MM-YY, kk:mm")}`)

        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
    
        message.channel.send({embed});
	},
};
