const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {

    if (message.channel.name !== 'bot-commands' & message.channel.type !== 'dm') {
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** channel. Please create it and try again.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`);
    }

    const embed = new Discord.RichEmbed()

    .setAuthor(`${client.user.username} - The Discord Bot`, client.user.displayAvatarURL)
    .setThumbnail('https://cdn.discordapp.com/emojis/393852367751086090.gif?v=1')
    .setDescription(`❯ Please don't remove any permission \n❯ Otherwise it will not work properly!! \n\n❯ [TAP HERE TO INVITE](https://discordapp.com/oauth2/authorize?client_id=499250383785558026&permissions=2146958847&scope=bot)`)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
    .setColor(65280)
    .setTimestamp()
    message.channel.send({embed});
}