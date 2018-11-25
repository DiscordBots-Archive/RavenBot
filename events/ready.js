const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client) => {
    console.log(`logging In \nClient: ${client.user.tag} \nUsers: ${client.users.size} \nChannels: ${client.channels.size} \nServers: ${client.guilds.size}`);
    client.user.setActivity(`${process.env.DISCORD_PREFIX}help`, {type: "PLAYING"});

    const channel = client.channels.find(ch => ch.id === '516098181549916172');

    const embed = new Discord.RichEmbed()
    .setColor('#157ef6')
    .setThumbnail('https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setFooter(`${client.user.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setTimestamp()
    .setAuthor('❯ CLIENT STARTED', 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setDescription(`• Client: ${client.user.tag}`+
    `\n• Servers: ${client.guilds.size}`+
    `\n• Users: ${client.users.size}`+
    `\n• Channels:  ${client.channels.size}`)
    channel.send({embed});

    
}
