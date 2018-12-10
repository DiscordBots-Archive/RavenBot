const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    //message.delete(6000);

    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')
    
    if(!message.member.roles.some(r=>["Dev", "Admin", "Co-Admin", "Staff"].includes(r.name)) ) {
        message.delete(5000);
        return message.channel.send(`Only Admins and Co-Admins can use thid Command!`).then(msg => {msg.delete(5000)});
    }

    let member = message.mentions.members.first();

    if(!member)
    return message.channel.send(`${message.author.username}: `+ "Please mention a valid member of this Server!").then(msg => {msg.delete(5000)});

    let muteRole = message.guild.roles.find(rol => rol.name === "Muted")

    let botcmd = message.guild.channels.find(ch => ch.name === "mod-log");
    if (!botcmd) return;

    const embed = new Discord.RichEmbed()
  
    .setColor(65280)
    .setTimestamp()
    .setDescription(`\`❯ USER UNMUTED \n• ${member.user.username} has been unmuted by ${message.author.username}\``)

    member.removeRole(muteRole).then(() => {
        message.channel.send("Done. User has been Un-Muted <a:hype:515571561345056783>");
        client.channels.get(botcmd.id).send({embed})
        .catch(error => message.channel.send(`${message.author.username}: ` + `Sorry, I couldn't unmute because of : ${error}`));
    });
}
