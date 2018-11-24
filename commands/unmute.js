const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')
    
    if(!message.member.roles.some(r=>[process.env.DEV_ROLE, process.env.ADM_ROLE, process.env.STF_ROLE, process.env.V_ROLE].includes(r.name)) )
    return message.channel.send(`${message.author.username} you don't have the role to use this, missing **${process.env.ADM_ROLE}** or **${process.env.STF_ROLE}** or **${process.env.V_ROLE}** role. Please create them and try again.`);

    let member = message.mentions.members.first();

    if(!member)
    return message.channel.send(`${message.author.username}: `+ "Please mention a valid member of this server!");

    let muteRole = message.guild.roles.find(rol => rol.name === "Muted")

    let botcmd = message.guild.channels.find(ch => ch.name === process.env.LOG_CHANNEL);
    if (!botcmd) return message.channel.send(`Could not found **#${process.env.LOG_CHANNEL}** channel. Please create it and try again.`);

    const embed = new Discord.RichEmbed()
  
    .setColor(65280)
    .setTimestamp()
    .setDescription(`\`❯ USER UNMUTED \n• ${member.user.username} has been unmuted by ${message.author.username}\``)

    member.removeRole(muteRole).then(() => {
        message.channel.send("<a:hype:515571561345056783>");
        client.channels.get(botcmd.id).send({embed})
        .catch(error => message.channel.send(`${message.author.username}: ` + `Sorry, I couldn't unmute because of : ${error}`));
    });
}