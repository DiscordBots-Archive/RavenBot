const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client, member) => {

    const embed = new Discord.RichEmbed()
    .setColor('#08f885')
    .setTimestamp()
    .setFooter(`USER JOINED`, member.user.displayAvatarURL)
    .setTitle(`${member.user.tag} | ${member.user.id}`)

    if (member.user.bot === true) return;


    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!channel) return;

    if (member.guild.id === '500004711005683717') {
        client.channels.get(channel.id).send(`Hello ${member}, Welcome to **${member.guild.name}** :tada:`);
        setTimeout(() => {
            client.channels.get(channel.id).send("If you're new to the server you should only see three chats." + "\n" + "To gain access to this server please react to the post in <#501395897322831875> with the checkmark by clicking it!")
        }, 2000);
        const channel = member.guild.channels.find(ch => ch.name === 'member-log');
        if (!channel) return;
        client.channels.get(channel.id).send({embed});

    } else {
        const channel = member.guild.channels.find(ch => ch.name === 'member-log');
        if (!channel) return;
        client.channels.get(channel.id).send({embed});
    }

}
