const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, guild) => {
    
    console.log(`Server Removed \nName ${guild.name} \nID: ${guild.id}`);

    const channel = client.channels.find(ch => ch.id === '516259519387533313');

    const embed = new Discord.RichEmbed()

    .setColor("#f32d11")
    .setThumbnail(client.user.displayAvatarURL)
    .setFooter(`Now ${client.guilds.size} Servers, ${client.users.size} Users`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setTimestamp()
    .setAuthor('CLIENT STATUS UPDATE', 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .addField(`❯ CLIENT REMOVED`, `• Server: ${guild.name}`+
    `\n• ID: ${guild.id}`+
    `\n• Owner: ${guild.owner.user.tag}`)

    channel.send({embed});

}