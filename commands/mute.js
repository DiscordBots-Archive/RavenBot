const Discord = require('discord.js');
exports.run = async (client, message, args) => {

    if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')
    
    if(!message.member.roles.some(r=>["Dev", "Admin", "Staff"].includes(r.name)) )
    return message.channel.send(`**${message.author.username}**: ` + "Sorry, you don't have the role to use this! \nMissing **Admin** or **Administrator** role. Please create them and try again.");

    let member = message.mentions.members.first();

    if(!member)
    return message.channel.send(`**${message.author.username}**: ` + "Please mention a valid member of this server");

    let reason = args.slice(1).join(' ');

    if(!reason) reason = "No reason provided";

    let muteRole = message.guild.roles.find(rol => rol.name === "Muted");
    if(!muteRole) return message.channel.send('Could not found **Muted** role. Please create it');

    let botcmd = message.guild.channels.find(ch => ch.name === "bot-spam");
    if (!botcmd) return message.channel.send('Could not found **#bot-spam** channel. Please create it and try again.');

    const embed = new Discord.RichEmbed()

    .setColor("#f32d11")
    .setTimestamp()
    .setDescription(`\`❯ USER MUTED \n• ${member.user.username} has been muted by ${message.author.username} \n• Reason: ${reason}\``)

    member.addRole(muteRole).then(() => {

        client.channels.get(botcmd.id).send({embed})

        .catch(error => message.channel.send(`**${message.author.username}**: `+ `Sorry, I couldn't mute because of : ${error}`));

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