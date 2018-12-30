const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    if (message.channel.name !== 'bot-commands' & message.channel.type !== 'dm') {
        //message.delete(4000);
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** channel.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`).then(msg => {msg.delete(4000)});
    }

    const sayMessage = args.join(" ");
    if (!args.join(" ")) {
        return message.channel.send(`${message.author.username}: ` + "Please provide a tag");
    };
    playertag = sayMessage.toUpperCase().replace(/#/g, '').replace(/O/g, '0')
    const m = await message.channel.send(playertag);
    m.edit(`Player Details: \nhttp://kuilin.net/cc_n/member.php?tag=${playertag}`);
    const embed = new Discord.RichEmbed()
    .setColor('#1E90ff')
    .setTitle("TAP HERE TO DIRECTLY OPEN IN GAME")
    .setURL(`https://link.clashofclans.com/?action=OpenPlayerProfile&tag=${playertag}`)
    message.channel.send({embed});
}