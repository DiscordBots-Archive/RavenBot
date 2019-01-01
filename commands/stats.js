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
        .setTitle(`CLIENT INFIORMATION`)
        .setThumbnail(client.user.displayAvatarURL)
        .setColor('#fcfb04')
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
    
        .addField("❯ MEMORY USAGE", `• Using : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`+
        `\n• Free : ${Math.round(os.freemem())} MB`)
    
        .addField('❯ LOAD AVERAGE', "• Avg : " + os.loadavg(10))
    
        .addField("❯ UPTIME", `• ${duration}`)
    
        .addField("❯ SERVER INFO", `\n• Servers : ${client.guilds.size}`)
    
        .addField("❯ USER INFO", `• Users : ${client.users.size}`+
        ` • Online : ${client.users.filter(m => m.presence.status === 'online').size}`+
        `\n• Dnd : ${client.users.filter(m => m.presence.status === 'dnd').size}`+
        ` • Idle : ${client.users.filter(m => m.presence.status === 'idle').size}`+
        ` • Offline : ${client.users.filter(m => m.presence.status === 'offline').size}`)
    
        .addField("❯ CHANNEL INFO", `• Total : ${client.channels.filter(ch => ch.type === 'text').size + client.channels.filter(ch => ch.type === 'voice').size}`+
        ` • Category :  ${client.channels.size - client.channels.filter(ch => ch.type === 'text').size - client.channels.filter(ch => ch.type === 'voice').size}`+
        `\n• Text : ${client.channels.filter(ch => ch.type === 'text').size}`+
        ` • Audio : ${client.channels.filter(ch => ch.type === 'voice').size}`)
    
        .addField("❯ LIBRARY INFO", `• Library : [Node.js](https://nodejs.org)`+
        `\n• Discord.js : [v${Discord.version}](https://discord.js.org)`+
        `\n• Node Version : [${process.version}](https://nodejs.org)`)
    
        .addField("❯ OWNER INFO", `• Owner : SUVAJIT#5580 <a:hype:515571561345056783>`+
        `\n• Creation Date : ${moment(client.user.createdAt).format("DD-MM-YY, kk:mm")}`) 
    
        message.channel.send({embed});
	},
};
