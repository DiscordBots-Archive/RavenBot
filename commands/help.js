const Discord = require('discord.js');

exports.run = (client, message, args) => {

    if (message.channel.name !== 'bot-commands' & message.channel.type !== 'dm') {
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** channel. Please create it and try again.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`);
    }

    const embed = new Discord.RichEmbed()
    .setAuthor(`COMMANDS INFORMATION`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setColor(65280)
    .setFooter(`Requested by ${message.author.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    //.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
    .setThumbnail('https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setTimestamp()

    .addField("**❯ HELP**", '<a:hype:515571561345056783>')
    .addField(`• ${process.env.DISCORD_PREFIX}help`,`It explains itself!`)

    .addField("**❯ INFO**", '<a:hype:515571561345056783>')
    .addField(`• ${process.env.DISCORD_PREFIX}stats`, `It shows the bot information`)
    .addField(`• ${process.env.DISCORD_PREFIX}server`, `It shows the server information`)
    .addField(`• ${process.env.DISCORD_PREFIX}user @user`, `It shows the user info`)
    .addField(`• ${process.env.DISCORD_PREFIX}ping`, `It shows the ping status`)
    .addField(`• ${process.env.DISCORD_PREFIX}invite`, `Invite the bot to your server`)

    .addField("**❯ MOD**", '<a:hype:515571561345056783>')
    .addField(`• ${process.env.DISCORD_PREFIX}kick @user`, `To kick a user`)
    .addField(`• ${process.env.DISCORD_PREFIX}ban @user`, `To ban a user`)
    .addField(`• ${process.env.DISCORD_PREFIX}mute @user`, `To mute a user for 1 min`)
    .addField(`• ${process.env.DISCORD_PREFIX}unmute @user`, `To unmute a user`)
    .addField(`• ${process.env.DISCORD_PREFIX}verify @user`, `To verify a user`)
    .addField(`• ${process.env.DISCORD_PREFIX}unverify @user`, ` To un-verify a user`)

    .addField("**❯ UTILS**", "<a:hype:515571561345056783>")
    .addField(`• ${process.env.DISCORD_PREFIX}clear`, `To clear messages`)
    .addField(`• ${process.env.DISCORD_PREFIX}link @user tag`, `Link your clash profile with discord account`)
    .addField(`• ${process.env.DISCORD_PREFIX}find @user/tag`, `Find someone's clash profile`)
    .addField(`• ${process.env.DISCORD_PREFIX}player tag`, `It shows the clash player info`)
    .addField(`• ${process.env.DISCORD_PREFIX}clan tag`, `It shows clan info`)

    .addField("**❯ MEE6**", "<a:hype:515571561345056783>")
    .addField(`• !rank`, `It shows your rank`)
    .addField(`• !levels`, `It shows the position`)


    /*.addField("❯ HELP", `• **${process.env.DISCORD_PREFIX}help** - It explains itself!`)

    .addField("❯ INFO", `• **${process.env.DISCORD_PREFIX}stats** - It shows the bot information`+
    `\n• **${process.env.DISCORD_PREFIX}server** - It shows the server information`+
    `\n• **${process.env.DISCORD_PREFIX}user @user** - It shows the user info`+
    `\n• **${process.env.DISCORD_PREFIX}ping** - It shows the ping status`+
    `\n• **${process.env.DISCORD_PREFIX}invite** - Invite the bot to your server`)

    .addField("❯ MOD", `• **${process.env.DISCORD_PREFIX}kick @user** - To kick a user`+
    `\n• **${process.env.DISCORD_PREFIX}ban @user** - To ban a user`+
    `\n• **${process.env.DISCORD_PREFIX}mute @user** - To mute a user for a min`+
    `\n• **${process.env.DISCORD_PREFIX}unmute @user** - To unmute a user`+
    `\n• **${process.env.DISCORD_PREFIX}verify @user** - To verify a user`+
    `\n• **${process.env.DISCORD_PREFIX}unverify @user** - To unverify a user`)

    .addField("❯ UTIL", `• **${process.env.DISCORD_PREFIX}clear** - To clear messages`+
    `\n• **${process.env.DISCORD_PREFIX}link @user tag** - Link discord with player tag **[BETA]**`+
    `\n• **${process.env.DISCORD_PREFIX}find @user/tag** - Find someone's clash profile **[BETA]**`+
    `\n• **${process.env.DISCORD_PREFIX}player tag** - It shows player info`+
    `\n• **${process.env.DISCORD_PREFIX}clan tag** - It shows clan info`)

    .addField("❯ MEE6", `• **!rank** - It shows your rank`+
    `\n• **!levels** - It shows the position`)*/

    message.channel.send({embed});
    
}
