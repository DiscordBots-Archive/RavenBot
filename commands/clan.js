const Discord = require('discord.js');
module.exports = {
    name: 'clan',
    type: 'Look up',
    aliases: ['clan lookup'],
	usage: '[ #clantag ]',
	description: 'Clan lookup',
    cooldown: 20,
    
	async execute(message, args) {
        if (message.channel.name !== 'bot-commands') {
            //message.delete(4000)
            let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
            if(!channel) return message.channel.send('Could not found **#bot-commands** channel.')
            return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`).then(msg => {msg.delete(4000)});
        }
    
        const sayMessage = args.join(" ");
        if (!args.join(" ")) {
            return message.channel.send(`${message.author.username}: ` + "Please provide a tag");
        };
        clantag = sayMessage.toUpperCase().replace(/#/g, '').replace(/O/g, '0')
        const m = await message.channel.send(clantag);
        m.edit(`Clan Details: \nhttp://kuilin.net/cc_n/clan.php?tag=${clantag}`);
        const embed = new Discord.RichEmbed()
        .setColor('#1E90ff')
        .setTitle("TAP HERE TO DIRECTLY OPEN IN GAME")
        .setURL(`https://link.clashofclans.com/?action=OpenClanProfile&tag=${clantag}`)
        message.channel.send({embed});
	},
};
