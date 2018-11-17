const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')

    if(!message.member.roles.some(r=>[process.env.DEV_ROLE, process.env.ADM_ROLE, process.env.STF_ROLE, process.env.V_ROLE].includes(r.name)) )
    return message.channel.send(`${message.author.username} you don't have the role to use this, missing **${process.env.ADM_ROLE}** or **${process.env.STF_ROLE}** role, please create them and try again.`);

    let member = message.mentions.members.first();

    if(!member)
    return message.channel.send(`**${message.author.username}**: ` + "Please mention a valid member of this server!");

    let greenRole = message.guild.roles.find(rol => rol.name === "Verified")

    let botcmd = message.guild.channels.find(ch => ch.name === "bot-spam");
    if (!botcmd) return message.channel.send('Could not found **#bot-spam** channel. Please create it and try again.');

    const embed = new Discord.RichEmbed()
  
    .setColor("#f32d11")
    .setTimestamp()
    .setDescription(`\`❯ USER UNVERIFIED \n• ${member.user.username} has been un-verified by ${message.author.username}\``)

    member.removeRole(greenRole).then(() => {
        client.channels.get(botcmd.id).send({embed})
        .catch(error => message.channel.send(`**${message.author.username}**: ` + `Sorry, I couldn't unverify because of : ${error}`));
    });
}