const Discord = require('discord.js');

module.exports = {
    name: 'ol',
    type: 'Utils',
    aliases: ['picture'],
	usage: '',
	description: 'null',
    cooldown: 60,
    botcmd: true,
    
	async execute(message) {
        const OLBase = new Discord.Attachment('https://cdn.discordapp.com/attachments/473745790280531970/529374186968317972/83a3e247611f4.png');
        message.channel.send(OLBase);
	},
};
