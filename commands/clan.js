const Discord = require('discord.js');
exports.run = async (client, message, args) => {

    if (message.channel.name !== 'bot-commands' & message.channel.type !== 'dm') {
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** & **#bot-spam** channel. Please create it and try again.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`);
    }

    const sayMessage = args.join(" ");
    if (!args.join(" ")) {
        return message.channel.send(`**${message.author.username}**: `+"Please provide a tag");
    };
    clantag = sayMessage.toUpperCase().replace(/#/g, '').replace(/O/g, '0')
    const m = await message.channel.send(clantag);
    m.edit(`Clan Details: \nhttp://kuilin.net/cc_n/clan.php?tag=${clantag}`);
    const embed = new Discord.RichEmbed()
    .setColor('#1E90ff')
    .setTitle("TAP HERE TO DIRECTLY OPEN IN GAME")
    .setURL(`https://link.clashofclans.com/?action=OpenClanProfile&tag=${clantag}`)
    message.channel.send({embed});
}