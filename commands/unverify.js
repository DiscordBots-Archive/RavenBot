const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')

    if(!message.member.roles.some(r=>["Administrator", "Admin", "Staff"].includes(r.name)) )
    return message.channel.send(`**${message.author.username}**: `+ "Sorry, you don't have the role to use this!  \nMissing **Admin** or **Administrator** role. Please create them and try again.");

    let member = message.mentions.members.first();

    if(!member)
    return message.channel.send(`**${message.author.username}**: `+ "Please mention a valid member of this server");

    if(!member.roleable)
    return message.channel.send(`**${message.author.username}**: `+ "I cannot kick this user: `Missing Permission or Role Order`");

    let greenRole = message.guild.roles.find(rol => rol.name === "Verified")

    let botcmd = message.guild.channels.find(ch => ch.name === "bot-spam");
    if (!botcmd) return message.channel.send('Could not found **#bot-spam** channel. Please create it and try again.');

    const embed = new Discord.RichEmbed()
  
    .setColor("#f32d11")
    .setTimestamp()
    .setDescription(`\`❯ USER UNVERIFIED \n• ${member.user.username} has been un-verified by ${message.author.username}\``)

    member.removeRole(greenRole).then(() => {
        client.channels.get(botcmd.id).send({embed})
        .catch(error => message.channel.send(`**${message.author.username}**: `+ `Sorry, I couldn't unverify because of : ${error}`));
    });
}