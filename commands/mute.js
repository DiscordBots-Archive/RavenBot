const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    message.delete(6000);

    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')
    
    if(!message.member.roles.some(r=>[process.env.DEV_ROLE, process.env.ADM_ROLE, process.env.STF_ROLE].includes(r.name)) ) {
        //message.delete(5000);
        return message.channel.send(`${message.author.username} you don't have the role to use this, missing **${process.env.ADM_ROLE}** or **${process.env.STF_ROLE}** role, please create them and try again.`).then(msg => {msg.delete(5000)});
    }

    let member = message.mentions.members.first();

    if(!member)
    return message.channel.send(`${message.author.username}: ` + "Please mention a valid member of this server!").then(msg => {msg.delete(5000)});

    let reason = args.slice(1).join(' ');

    if(!reason) reason = "No reason provided";

    let muteRole = message.guild.roles.find(rol => rol.name === "Muted");
    if(!muteRole) return message.channel.send('Could not found **Muted** role. Please create it').then(msg => {msg.delete(5000)});

    let botcmd = message.guild.channels.find(ch => ch.name === process.env.LOG_CHANNEL);
    if (!botcmd) return message.channel.send(`Could not found **#${process.env.LOG_CHANNEL}** channel. Please create it and try again.`).then(msg => {msg.delete(5000)});

    const embed = new Discord.RichEmbed()

    .setColor("#f32d11")
    .setTimestamp()
    .setDescription(`\`❯ USER MUTED \n• ${member.user.username} has been muted by ${message.author.username} \n• Reason: ${reason}\``)

    member.addRole(muteRole).then(() => {

        message.channel.send("Done. User has been Muted <a:hype:515571561345056783>").then(msg => {msg.delete(6000)});

        client.channels.get(botcmd.id).send({embed})

        .catch(error => message.channel.send(`${message.author.username}: ` + `Sorry, I couldn't mute because of : ${error}`)).then(msg => {msg.delete(5000)});

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
