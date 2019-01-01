const Discord = require('discord.js');
module.exports = {
    name: 'clan',
    type: 'Look up',
    aliases: ['clan search'],
	usage: '[#clantag]',
    description: 'Clan lookup',
    args: true,
    cooldown: 20,
    botcmd: true,
    
	async execute(message, args) {
    
        const sayMessage = args[0];

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
