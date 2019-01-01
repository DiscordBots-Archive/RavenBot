const Discord = require('discord.js');
module.exports = {
    name: 'player',
    type: 'Look up',
    aliases: ['player lookup'],
	usage: '[#playertag]',
	description: 'Player Lookup',
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
