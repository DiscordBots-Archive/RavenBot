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
    
        .addField("`❯ HELP - IT EXPLAINS ITSELF`", `\`• ${process.env.DISCORD_PREFIX}help\``)
    
        .addField("`❯ INFO - CHECK STATISTICAL INFO OF THE BOT, SERVER INFO, USER INFO & PING STATUS`", `\`• ${process.env.DISCORD_PREFIX}stats\`` +' '+ '\n' +
        `\`• ${process.env.DISCORD_PREFIX}server\`` +' '+ '\n' + 
        `\`• ${process.env.DISCORD_PREFIX}user @user\`` +' ' + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}ping\``)

        .addField("`❯ MOD - KICK / BAN / MUTE / UNMUTE A USER FROM THE SERVER`", `\`• ${process.env.DISCORD_PREFIX}kick @user reason\`` +' '+ '\n' +
        `\`• ${process.env.DISCORD_PREFIX}ban @user reason\`` +' ' + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}mute @user reason\`` +' '+ '\n' +
        `\`• ${process.env.DISCORD_PREFIX}unmute @user\``)

        .addField('`❯ ADMIN - ADD PERMISSIONS TO THE USER`', `\`• ${process.env.DISCORD_PREFIX}perms @user [add/remove] [verified/staff/coadmin/admin]\``)
    
        .addField("`❯ UTILS - CLEAR MESSAGES UPTO 50 AT A TIME, CLASH OF CLANS PLAYER & CLAN LOOKUP`", `\`• ${process.env.DISCORD_PREFIX}clear @user no. of msg\`` +' ' + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}player #tag\`` +' '+ '\n' +
        `\`• ${process.env.DISCORD_PREFIX}clan #tag\``)

        .addField("`❯ MEE6 - CHECK YOUR MEE6 RANK AND LEVELS OR POSITION`", `\`\n• !rank\`` +' ' + '\n' +
        `\`• !levels\``)

        message.channel.send({embed});
    }
    
}
/*
        .addField("❯ HELP", `\`• ${process.env.DISCORD_PREFIX}help\`` +' '+ `\`It explains itself!\``)
    
        .addField("❯ INFO", `\`• ${process.env.DISCORD_PREFIX}stats\`` +' '+ `\`It shows the bot information\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}server\`` +' '+ `\`It shows the server information\`` + '\n' + 
        `\`• ${process.env.DISCORD_PREFIX}user @user\`` +' '+ `\`It shows the user info\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}ping\`` +' '+ `\`It shows the ping status\``)

        .addField("❯ MOD", `\`• ${process.env.DISCORD_PREFIX}kick @user\`` +' '+ `\`To kick a user\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}ban @user\`` +' '+ `\`To ban a user\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}mute @user\`` +' '+ `\`To mute a user for 1 min\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}unmute @user\`` +' '+ `\`To unmute a user\``)

        .addField('ADMIN', `\`• ${process.env.DISCORD_PREFIX}perms @user [add/remove] [verified/staff/coadmin/admin]\`` + '\n' +
        `\`• To add special permissions to the user\``)
    
        .addField("❯ UTILS", `\`• ${process.env.DISCORD_PREFIX}clear [optional @user]\`` +' '+ `\`To clear messages\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}player tag\`` +' '+ `\`It shows the clash player info\`` + '\n' +
        `\`• ${process.env.DISCORD_PREFIX}clan tag\`` +' '+ `\`It shows clan info\``)

        .addField("❯ MEE6", `\`\n• !rank\`` +' '+ `\`It shows your rank\`` + '\n' +
        `\`• !levels\`` +' '+ `\`It shows the position\``)
*/
