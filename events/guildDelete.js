const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, guild) => {

    console.log(`Server Removed. Name ${guild.name}, ID: ${guild.id}`);

    const channel = client.channels.find(ch => ch.id === '516259519387533313');
    if (!channel) return;

    const embed = new Discord.RichEmbed()

    .setColor("#f60839")
    .setThumbnail(client.user.displayAvatarURL)
    .setFooter(`${client.user.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setTimestamp()
    .setTitle(`${guild.name} | ${guild.id}`)
    .setDescription(`OWNER: ${guild.owner.user.tag} | ${guild.memberCount} USERS`)

    channel.send({embed});

}