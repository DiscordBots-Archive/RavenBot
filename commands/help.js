const Discord = require('discord.js');

exports.run = (client, message, args) => {

    if (message.channel.name !== 'bot-commands' & message.channel.type !== 'dm') {
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** channel. Please create it and try again.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`);
    }

    const embed = new Discord.RichEmbed()
    .setAuthor(`COMMANDS INFORMATION`, client.user.displayAvatarURL)
    .setColor(65280)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
    .setThumbnail(client.user.displayAvatarURL)
    .setTimestamp()
    .addField("❯ HELP", "• **!help** - It explains itself!")

    .addField("❯ INFO", `• **!stats** - It shows the bot information`+
    `\n• **!server** - It shows the server information`+
    `\n• **!user @user** - It shows the player info`+
    `\n• **!ping** - It shows the ping status`)

    .addField("❯ MOD", `• **!kick @user** - To kick a user`+
    `\n• **!ban @user** - To ban a user`+
    `\n• **!mute @user** - To mute a user for a min`+
    `\n• **!unmute @user** - To unmute a user`+
    `\n• **!verify @user** - To verify a user`+
    `\n• **!unverify @user** - To unverify a user`)

    .addField("❯ UTIL", `• **!clear** - To clear messages`+
    `\n• **!player tag** - It shows player info`+
    `\n• **!clan tag** - It shows clan info`)

    .addField("❯ MEE6", `• **!rank** - It shows your rank`+
    `\n• **!levels** - It shows the position`)

    message.channel.send({embed});
    
}