const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message, args) => {
    //message.delete(6000);

    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')
    
    if(!message.member.roles.some(r=>["Dev", "Admin"].includes(r.name)) ) {
        message.delete(5000);
        return message.channel.send(`Only Admins can use this Command!`).then(msg => {msg.delete(5000)});
    }

    let member = message.mentions.members.first();
    
    let botcmd = message.guild.channels.find(ch => ch.name === "mod-log");
    if (!botcmd) return;

    if(!member)
    return message.channel.send(`${message.author.username}: ` + "Please mention a valid member of this server!").then(msg => {msg.delete(5000)});

    if(!member.bannable) 
    return message.channel.send(`${message.author.username}: ` + "I cannot ban this user: `Missing Permission or Role Order`").then(msg => {msg.delete(5000)});

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.ban(reason)
    .catch(error => message.channel.send(`${message.author.username}: ` + `Sorry, I couldn't ban because of : ${error}`));

    const embed = new Discord.RichEmbed()
    
    .setColor("#f32d11")
    .setTimestamp()
    .setDescription(`\`❯ USER BANNED \n• ${member.user.username} has been banned by ${message.author.username} \n• Reason : ${reason}\``)

    client.channels.get(botcmd.id).send({embed});
    message.channel.send("Done. User has been Banned <a:hype:515571561345056783>");
}
