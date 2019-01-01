const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
    name: 'server',
    type: 'Utils',
    aliases: ['server info'],
	usage: '[ text ]',
	description: 'Get your server information',
    cooldown: 60,
    guildOnly: true, 

	async execute(message) {
        if (message.channel.name !== 'bot-commands' ) {
            //message.delete(4000);
            let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
            if(!channel) return message.channel.send('Could not found **#bot-commands** channel.')
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`).then(msg => {msg.delete(4000)});
        }
    
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
    
        message.channel.send({embed});
	},
};
