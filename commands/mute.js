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

    let reason = args.slice(1).join(' ');

    if(!reason) reason = "No reason provided";

    let muteRole = message.guild.roles.find(rol => rol.name === "Muted");
    if(!muteRole) return message.channel.send('Could not found **Muted** role. Please create it').then(msg => {msg.delete(5000)});

    let botcmd = message.guild.channels.find(ch => ch.name === "mod-log");
    if (!botcmd) return;

    const embed = new Discord.RichEmbed()

    .setColor("#f32d11")
    .setTimestamp()
    .setDescription(`\`❯ USER MUTED \n• ${member.user.username} has been muted by ${message.author.username} \n• Reason: ${reason}\``)

    member.addRole(muteRole).then(() => {

        message.channel.send("Done. User has been Muted <a:hype:515571561345056783>");

        client.channels.get(botcmd.id).send({embed})

        .catch(error => message.channel.send(`${message.author.username}: ` + `Sorry, I couldn't mute because of : ${error}`)) ;

        setTimeout( () => {

            member.removeRole(muteRole)

            const embed = new Discord.RichEmbed()

            .setColor(65280)
            .setTimestamp()
            .setDescription(`\`❯ USER UNMUTED \n• ${member.user.username} has been unmuted by ${client.user.username}\``)

            client.channels.get(botcmd.id).send({embed});

        }, 60000); // 60000 Miliseconds ===> 60 Seconds { 1 sec = 1000 ms }

    });

}
