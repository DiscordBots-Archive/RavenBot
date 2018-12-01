const Discord = require('discord.js');
exports.run = async (client, message, args) => {

    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')

    if(!message.member.roles.some(r=>[process.env.DEV_ROLE, process.env.ADM_ROLE, process.env.STF_ROLE].includes(r.name)) ) {
        message.delete(5000);
        return message.channel.send(`${message.author.username} you don't have the role to use this, missing **${process.env.ADM_ROLE}** or **${process.env.STF_ROLE}** role please create them and try again.`).then(msg => {msg.delete(5000)});
    }

    let member = message.mentions.members.first();

    if(!member)
    return message.channel.send(`${message.author.username}: `+ "Please mention a valid member of this server!");

    let greenRole = message.guild.roles.find(rol => rol.name === process.env.V_ROLE)
    if(!greenRole) return message.channel.send(`${process.env.V_ROLE} role not found`)

    let botcmd = message.guild.channels.find(ch => ch.name === process.env.LOG_CHANNEL);
    if (!botcmd) return message.channel.send(`Could not found **#${process.env.LOG_CHANNEL}** channel. Please create it and try again.`);

    const embed = new Discord.RichEmbed()
  
    .setColor(65280)
    .setTimestamp()
    .setDescription(`\`❯ USER VERIFIED \n• ${member.user.username} has been verified by ${message.author.username}\``)

    member.addRole(greenRole).then(() => {
        message.channel.send("<a:hype:515571561345056783>");
        client.channels.get(botcmd.id).send({embed})
        .catch(error => message.channel.send(`${message.author.username}: ` + `Sorry, I couldn't verify because of : ${error}`));
    });

}