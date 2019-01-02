const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
    name: 'user',
    type: 'Utils',
    aliases: ['user-info'],
	usage: '[optional user]',
    description: 'User lookup! get info about yourself or any other user',
    example: ['user @Purple', 'user 499250383785558026'],
    cooldown: 60,
    guildOnly: true,
    botcmd: true,

	async execute(message, args) {
    
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    
        if(!member) {
    
            let bot;
            if (message.author.bot === true) {
                bot = "• User is a <:bot:515444614564413441>";
            } else {
                bot = '';
            }
    
            let emot;
            if (message.author.presence.status.toUpperCase() === "ONLINE") {
                emot = "<:online:515444566145630218>";
            } else if (message.author.presence.status.toUpperCase() === "DND") {
                emot = "<:dnd:515444542174920730>";
            } else if (message.author.presence.status.toUpperCase() === "OFFLINE") {
                emot = "<:offline:515444585686892587>";
            } else if (message.author.presence.status.toUpperCase() === "IDLE") {
                emot = "<:idle:515444772228431872>";
            }
    
            const embed = new Discord.RichEmbed()
            .setColor('#fae18c')
            .setFooter(`Requested by ${message.author.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL)
            .setDescription(`Info about **${message.author.username}** (ID: ${message.author.id})`)
            
            .addField("❯ MEMBER DETAILS", `• Nickname: ${message.member.nickname !== null ? `${message.member.nickname}` : "None"}`+
            `\n• Joined at: ${moment(message.member.joinedAt).format("D-MM-YY, k:mm")}`+
            `\n• Roles: ${message.member.roles.map(roles => `\`${roles.name}\``).join(' ')}`)
    
            .addField("❯ USER DETAILS", `${bot !== null? `${bot}` : ""}`+
            `\n• ID: ${message.author.id}`+
            `\n• Username: ${message.author.tag}`+
            `\n• Status: \`${message.author.presence.status.toUpperCase()}\` ${emot !== null? `${emot}` : ""}`+
            `\n• Activity: \`${message.author.presence.game ? `${message.author.presence.game.name}` : "None"}\``+
            `\n• Account created at: ${moment(message.author.createdAt).format("D-MM-YY, k:mm")}`)
            return message.channel.send({embed})
        };
    
        let bot;
        if (member.user.bot === true) {
            bot = "• User is a <:bot:515444614564413441>";
        } else {
            bot = '';
        }
    
        let emot;
        if (member.user.presence.status.toUpperCase() === "ONLINE") {
            emot = "<:online:515444566145630218>";
        } else if (member.user.presence.status.toUpperCase() === "DND") {
            emot = "<:dnd:515444542174920730>";
        } else if (member.user.presence.status.toUpperCase() === "OFFLINE") {
            emot = "<:offline:515444585686892587>";
        } else if (member.user.presence.status.toUpperCase() === "IDLE") {
            emot = "<:idle:515444772228431872>";
        }
    
        const embed = new Discord.RichEmbed()
        .setColor('#f6ff5c')
        .setFooter(`Requested by ${message.author.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`Info about **${member.user.username}** (ID: ${member.user.id})`)
    
        .addField("❯ MEMBER DETAILS", `• Nickname: ${member.nickname !== null ? `${member.nickname}` : "None"}`+
        `\n• Joined at: ${moment(member.joinedAt).format("D-MM-YY, k:mm")}`+
        `\n• Roles: ${member.roles.map(roles => `\`${roles.name}\``).join(' ')}`)
    
        .addField("❯ USER DETAILS", `${bot !== null? `${bot}` : ""}`+
        `\n• ID: ${member.user.id}`+
        `\n• Username: ${member.user.tag}`+
        `\n• Status: \`${member.user.presence.status.toUpperCase()}\` ${emot !== null? `${emot}` : ""}`+
        `\n• Activity: \`${member.user.presence.game ? `${member.user.presence.game.name}` : "None"}\``+
        `\n• Account created at: ${moment(member.user.createdAt).format("D-MM-YY, k:mm")}`)
    
        message.channel.send({embed});
	},
};

