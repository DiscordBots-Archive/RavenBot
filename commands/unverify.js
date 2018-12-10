const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    //message.delete(6000);
    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')

    if(!message.member.roles.some(r=>["Dev", "Admin", "Co-Admin"].includes(r.name)) ) {
        message.delete(5000);
        return message.channel.send(`Only Admins and Co-Admins can use this Command!`).then(msg => {msg.delete(5000)});
    }

    let member = message.mentions.members.first();

    if(!member)
    return message.channel.send(`${message.author.username}: ` + "Please mention a valid member of this Server!").then(msg => {msg.delete(5000)});

    let greenRole = message.guild.roles.find(rol => rol.name === "Verified")
    if(!greenRole) return message.channel.send(`Verified role not found`).then(msg => {msg.delete(5000)});

    let botcmd = message.guild.channels.find(ch => ch.name === client.config.logchannel.modlog_ch_id);
    if (!botcmd) return;

    const embed = new Discord.RichEmbed()
  
    .setColor("#f32d11")
    .setTimestamp()
    .setDescription(`\`❯ USER UNVERIFIED \n• ${member.user.username} has been un-verified by ${message.author.username}\``)

    member.removeRole(greenRole).then(() => {
        message.channel.send("Done. User has been Un-Verified <a:hype:515571561345056783>");
        client.channels.get(botcmd.id).send({embed})
        .catch(error => message.channel.send(`${message.author.username}: ` + `Sorry, I couldn't unverify because of : ${error}`));
    });
}
