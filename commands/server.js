const Discord = require('discord.js');
const moment = require('moment');

exports.run = (client, message, args) => {

    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')
    if (message.channel.name !== 'bot-commands' ) {
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** channel. Please create it and try again.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`);
    }

    const embed = new Discord.RichEmbed()
    .setDescription(`Info about **${message.guild.name}** (ID: ${message.guild.id})`)
    .setColor(65280)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
    .setTimestamp()

    .addField("❯ CHANNELS & ROLES", `• Category: ${message.guild.channels.size - message.guild.channels.filter(ch => ch.type === 'text').size - message.guild.channels.filter(ch => ch.type === 'voice').size}`+
    `\n• Total: ${message.guild.channels.filter(ch => ch.type === 'text').size + message.guild.channels.filter(ch => ch.type === 'voice').size}`+
    `\n• Text: ${message.guild.channels.filter(ch => ch.type === 'text').size}`+ 
    `\n• Audio: ${message.guild.channels.filter(ch => ch.type === 'voice').size}`+
    `\n• Roles: ${message.guild.roles.size}`)

    .addField("❯ MEMBERS", `• Total: ${message.guild.memberCount}`+
    `\n• Bots : ${message.guild.members.filter(m => m.user.bot).size}`+
    `\n• Humans: ${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}`+
    `\n• Online: ${message.guild.members.filter(m => m.presence.status === 'online').size}`)

    .addField("❯ OTHERS", `• Owner: ${message.guild.owner.user.tag}`+
    `\n• Region: ${message.guild.region.toUpperCase()}`+
    `\n• Created at: ${moment(message.guild.createdAt).format("D-MM-YY, kk:mm")}`)

    message.channel.send({embed});
}