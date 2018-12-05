const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    //message.delete(6000);

    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')

    if(!message.member.roles.some(r=>[client.config.mod_role.r1, client.config.mod_role.r2, client.config.mod_role.r3].includes(r.name)) ) {
        message.delete(5000);
        return message.channel.send(`${message.author.username} you don't have the role to use this, missing **${client.config.mod_role.r2}** or **${client.config.mod_role.r3}** role please create them and try again.`).then(msg => {msg.delete(5000)});
    }

    let member = message.mentions.members.first();

    if(!member)
    return message.channel.send(`${message.author.username}: `+ "Please mention a valid member of this server!").then(msg => {msg.delete(5000)});

    let greenRole = message.guild.roles.find(rol => rol.name === client.config.role.r5)
    if(!greenRole) return message.channel.send(`${client.config.role.r5} role not found.`).then(msg => {msg.delete(5000)});

    let botcmd = message.guild.channels.find(ch => ch.name === client.config.logchannel.modlog_ch_id);
    if (!botcmd) return;

    const embed = new Discord.RichEmbed()
  
    .setColor(65280)
    .setTimestamp()
    .setDescription(`\`❯ USER VERIFIED \n• ${member.user.username} has been verified by ${message.author.username}\``)

    member.addRole(greenRole).then(() => {
        message.channel.send("Done. User has been Verified <a:hype:515571561345056783>");
        client.channels.get(botcmd.id).send({embed})
        .catch(error => message.channel.send(`${message.author.username}: ` + `Sorry, I couldn't verify because of : ${error}`));
    });

}
