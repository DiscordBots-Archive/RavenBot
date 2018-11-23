const Discord = require('discord.js');
const os = require('os-utils');
const moment = require('moment');
const duration = require('moment-duration-format');
exports.run = (client, message, args) => {

    if (message.channel.name !== 'bot-commands' & message.channel.type !== 'dm') {
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** channel. Please create it and try again.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`);
    }

    const duration = moment.duration(client.uptime).format("D [days], H [hrs], m [mins], s [secs]");

    const embed = new Discord.RichEmbed()
    .setAuthor(`CLIENT INFIORMATION`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    //.setAuthor(`CLIENT INFIORMATION`, client.user.displayAvatarURL)
    .setThumbnail('https://discordemoji.com/assets/emoji/DiscordHype.gif')
    //.setThumbnail(client.user.displayAvatarURL)
    .setColor(65280)
    .setFooter(`Requested by ${message.author.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
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

    .addField("❯ OWNER INFO", `• Owner : SUVAJIT#5580`+
    `\n• Creation Date : ${moment(client.user.createdAt).format("DD-MM-YY, kk:mm")}`) 

    message.channel.send({embed});

    /*{
        const embed = new Discord.RichEmbed()
        .setColor(65280)
        .setFooter(`© ${client.user.username}`, client.user.displayAvatarURL)
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL)
        .setTitle('❯ NOTICE')
        .setDescription("This bot is still in BETA, if you find any error/ fault/ bug, please infrom them using my discord tag above ^")
        message.channel.send({embed});
    }*/
}
