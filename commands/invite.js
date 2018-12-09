const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {

    message.delete(10000);

    if (message.channel.name !== 'bot-commands' & message.channel.type !== 'dm') {
        message.delete(4000)
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** channel. Please create it and try again.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`).then(msg => {msg.delete(4000)});
    }

    const embed = new Discord.RichEmbed()
    
    .setAuthor(`${client.user.username} - The Discord Bot`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setThumbnail('https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setDescription(`❯ Please don't remove any permission \n❯ Otherwise it will not work properly!! \n\n❯ [TAP HERE TO INVITE](https://discordapp.com/oauth2/authorize?client_id=504702844889202748&permissions=2146958847&scope=bot)`)
    .setFooter(`Requested by ${message.author.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setColor(65280)
    .setTimestamp()
    message.channel.send({embed}).then(msg => {msg.delete(10000)});
}