const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client) => {
    
    console.log(`logging In: Client: ${client.user.tag}, Users: ${client.users.size}, Channels: ${client.channels.size}, Servers: ${client.guilds.size}`);
    client.user.setActivity(`${client.config.discord.prefix}help`, {type: "STREAMING"});

    const channel = client.channels.find(ch => ch.id === '516098181549916172');
    if (!channel) return;

    const embed = new Discord.RichEmbed()
    .setColor('#9bf10c')
    //.setThumbnail(client.user.displayAvatarURL)
    .setFooter(`${client.user.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setTimestamp()
    .setTitle(`${client.user.tag} | ${client.user.id}`)
    .setDescription(`${client.guilds.size} SERVERS, ${client.users.size} USERS, ${client.channels.size} CHANNELS`)

    channel.send({embed}); 
}
