const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')
    
    if(!message.member.roles.some(r=>["Dev", "Admin", "Staff", "Verified"].includes(r.name)) )
    return message.channel.send(`**${message.author.username}**: `+"Sorry, you don't have the role to use this!  \nMissing **Admin** or **Administrator** role. Please create them and try again.");

    let member = message.mentions.members.first();

    if(!member)
    return message.channel.send(`**${message.author.username}**: `+ "Please mention a valid member of this server");

    let muteRole = message.guild.roles.find(rol => rol.name === "Muted")

    let botcmd = message.guild.channels.find(ch => ch.name === "bot-spam");
    if (!botcmd) return message.channel.send('Could not found **#bot-spam** channel. Please create it and try again.');

    const embed = new Discord.RichEmbed()
  
    .setColor(65280)
    .setTimestamp()
    .setDescription(`\`❯ USER UNMUTED \n• ${member.user.username} has been unmuted by ${message.author.username}\``)

    member.removeRole(muteRole).then(() => {
        client.channels.get(botcmd.id).send({embed})
        .catch(error => message.channel.send(`**${message.author.username}**: `+ `Sorry, I couldn't unmute because of : ${error}`));
    });
}