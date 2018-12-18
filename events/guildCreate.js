const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, guild) => {

    console.log(`New Server added. Name: ${guild.name}, ID: ${guild.id}`);

    const channel = client.channels.find(ch => ch.id === '516259519387533313');

    const embed = new Discord.RichEmbed()

    .setColor(65280)
    .setThumbnail(client.user.displayAvatarURL)
    .setFooter(`NOW ${client.guilds.size} SERVERS`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setTimestamp()
    .setAuthor('CLIENT STATUS UPDATE','https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .addField(`❯ CLIENT ADDED`, `• \`SERVER: ${guild.name}\``+
    `\n• \`ID: ${guild.id}\``+
    `\n• \`OWNER: ${guild.owner.user.tag}\``+
    `\n• \`MEMBERS: ${guild.memberCount}\``)

    channel.send({embed});

}