const Discord = require('discord.js');
module.exports = {
    name: 'player',
    type: 'null',
	usage: '[#playertag]',
    description: 'Clash of Clans player lookup',
    example: ['player #9Q92C8R20'],
    cooldown: 20,
    args: true,
    botcmd: true,

	async execute(message, args) {
    
        const sayMessage = args[0];

        playertag = sayMessage.toUpperCase().replace(/#/g, '').replace(/O/g, '0')
        const m = await message.channel.send(playertag);
        m.edit(`Player Details: \nhttp://kuilin.net/cc_n/member.php?tag=${playertag}`);
        const embed = new Discord.RichEmbed()
        .setColor('#1E90ff')
        .setTitle("TAP HERE TO DIRECTLY OPEN IN GAME")
        .setURL(`https://link.clashofclans.com/?action=OpenPlayerProfile&tag=${playertag}`)
        message.channel.send({embed});
	},
};
