const Discord = require('discord.js');
const client = new Discord.Client()
module.exports = (client, member) => {
    const channel = member.guild.channels.find(ch => ch.name === 'bot-spam'); 
    if (!channel) return;
    const embed = new Discord.RichEmbed()
    .setColor("#f32d11")
    .setTimestamp()
    .setDescription(`\`❯ USER LEFT \n• ${member.user.tag} has left\``)
    channel.send({embed});
    
}
