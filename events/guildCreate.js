const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, guild) => {
    console.log(`New Server added \nName: ${guild.name} \nID: ${guild.id}`);

    const channel = client.channels.find(ch => ch.id === '516098181549916172');

    const embed = new Discord.RichEmbed()

    .setColor(65280)
    .setThumbnail('https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setFooter(`Now ${client.guilds.size} Servers, ${client.users.size} Users`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setTimestamp()
    .setAuthor('CLIENT STATUS UPDATE','https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .addField(`❯ CLIENT ADDED`, `• Server: ${guild.name}`+
    `\n• ID: ${guild.id}`+
    `\n• Owner: ${guild.owner.user.tag}`+
    `\n• Members: ${guild.memberCount}`)

    channel.send({embed});

}