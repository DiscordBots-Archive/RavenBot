const Discord = require('discord.js');

exports.run = (client, message, args) => {

    if (message.channel.type == 'dm') {
        message.channel.send(`I do not talk personally ^_^`);
    };

    if (message.guild.id !== '500004711005683717') return message.channel.send(`This command works for **Air Hounds - Discord Server** Only <:right:509629414120882176>` + `\n` + `https://discord.gg/8RTMVFW`);

    let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
    if(!channel) return message.channel.send('Could not found **#bot-commands** channel.')
    if(message.channel.name !== 'bot-commands') {
        message.delete(4000);
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`).then(msg => {msg.delete(4000)});
    }

    const embed = new Discord.RichEmbed()
    .setAuthor(`COMMANDS INFORMATION`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setColor('#c3fd09')
    .setFooter(`Requested by ${message.author.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    //.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
    .setThumbnail('https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setTimestamp()

    .addField("❯ HELP", `\`• ${process.env.DISCORD_PREFIX}help\`` +' '+ `\`- It explains itself!\``)

    .addField("❯ INFO", `\`• ${process.env.DISCORD_PREFIX}stats\`` +' '+ `\`- Get the bot info\`` + '\n' +
    `\`• ${process.env.DISCORD_PREFIX}server\`` +' '+ `\`- Get the server info\`` + '\n' + 
    `\`• ${process.env.DISCORD_PREFIX}user @user\`` +' '+ `\`- Get the user info\`` + '\n' +
    `\`• ${process.env.DISCORD_PREFIX}ping\`` +' '+ `\`- It shows the ping status\``)

    .addField("❯ MOD", `\`• ${process.env.DISCORD_PREFIX}kick @user\`` +' '+ `\`- To kick a user\`` + '\n' +
    `\`• ${process.env.DISCORD_PREFIX}ban @user\`` +' '+ `\`- To ban a user\`` + '\n' +
    `\`• ${process.env.DISCORD_PREFIX}mute @user\`` +' '+ `\`- To mute a user\`` + '\n' +
    `\`• ${process.env.DISCORD_PREFIX}unmute @user\`` +' '+ `\`- To unmute a user\``)

    .addField('❯ ADMIN', `\`• ${process.env.DISCORD_PREFIX}perms - Add roles to the user\`` + '\n' +
    `\`• Type !perms for more info\``)

    .addField("❯ UTILS", `\`• ${process.env.DISCORD_PREFIX}clear @user\`` +' '+ `\`- Clear messages\`` + '\n' +
    `\`• ${process.env.DISCORD_PREFIX}player #tag\`` +' '+ `\`- Player Lookup\`` + '\n' +
    `\`• ${process.env.DISCORD_PREFIX}clan #tag\`` +' '+ `\`- Clan Lookup\``)

    .addField("❯ MEE6", `\`\n• !rank\`` +' '+ `\` - It shows your rank\`` + '\n' +
    `\`• !levels\`` +' '+ `\` - It shows the position\``)

    message.channel.send({embed});
    
}

