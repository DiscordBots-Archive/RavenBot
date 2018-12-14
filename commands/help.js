const Discord = require('discord.js');

exports.run = (client, message, args) => {


    if (message.channel.type == 'dm') {
        message.channel.send(`I do not talk personally ^_^`);
    }

    else if (message.guild.id == '500004711005683717') {
        
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(message.channel.name !== 'bot-commands') {
            message.delete(4000);
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`).then(msg => {msg.delete(4000)});
        }

        const embed = new Discord.RichEmbed()
        .setAuthor(`COMMANDS INFORMATION`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
        .setColor(65280)
        .setFooter(`Requested by ${message.author.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
        //.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
        .setThumbnail('https://discordemoji.com/assets/emoji/DiscordHype.gif')
        .setTimestamp()
    
        .addField("❯ HELP", `\`• ${process.env.DISCORD_PREFIX}help\`` +' '+ `\`It explains itself!\``)
    
        .addField("❯ INFO", `\`• ${process.env.DISCORD_PREFIX}stats\`` +' '+ `\`It shows the bot info\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}server\`` +' '+ `\`It shows server info\`` + '\n' + 
        `\`• ${process.env.DISCORD_PREFIX}user @user\`` +' '+ `\`It shows the user info\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}ping\`` +' '+ `\`It shows the ping status\``)

        .addField("❯ MOD", `\`• ${process.env.DISCORD_PREFIX}kick @user\`` +' '+ `\`To kick a user\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}ban @user\`` +' '+ `\`To ban a user\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}mute @user\`` +' '+ `\`To mute a user\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}unmute @user\`` +' '+ `\`To unmute a user\``)

        .addField('ADMIN', `\`• ${process.env.DISCORD_PREFIX}perms @user [add/remove] [verified/staff/coadmin/admin]\`` + '\n' +
        `\`• To add permissions to the user\``)
    
        .addField("❯ UTILS", `\`• ${process.env.DISCORD_PREFIX}clear [optional @user]\`` +' '+ `\`To clear messages\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}player tag\`` +' '+ `\`Player Lookup\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}clan tag\`` +' '+ `\`Clan Lookup\``)

        .addField("❯ MEE6", `\`\n• !rank\`` +' '+ `\`It shows your rank\`` + '\n' +
        `\`• !levels\`` +' '+ `\`It shows the position\``)

        message.channel.send({embed});
    }
    
}
/*

*/
