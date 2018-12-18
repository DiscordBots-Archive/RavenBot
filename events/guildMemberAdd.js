const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, member) => {

    const channel = member.guild.channels.find(ch => ch.name === 'welcome');

    if (!channel) return;

    if (member.user.bot === true) return;

    client.channels.get(channel.id).send(`Hello ${member}, Welcome to **${member.guild.name}** :tada:`);

    {
        if (member.user.bot === true) return;

        const channel = member.guild.channels.find(ch => ch.name === 'member-log'); 

        if (!channel) return;

        const embed = new Discord.RichEmbed()
        .setColor(65280)
        .setTimestamp()
        .setFooter(`User Joined`, member.user.displayAvatarURL)
        .setTitle(`${member.user.tag} | ${member.user.id}`)
        
        client.channels.get(channel.id).send({embed});
    }
}
