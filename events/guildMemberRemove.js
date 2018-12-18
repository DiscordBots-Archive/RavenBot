const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, member) => {
    
    const channel = member.guild.channels.find(ch => ch.name === 'member-log'); 
    if (!channel) return;

    if (member.user.bot === true) return;

    const embed = new Discord.RichEmbed()
    .setColor("#f32d11")
    .setTimestamp()
    .setFooter(`USER LEFT`, member.user.displayAvatarURL)
    .setTitle(`${member.user.tag} | ${member.user.id}`)

    client.channels.get(channel.id).send({embed});
    
}
