const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'channel',
	type: 'Info',
    usage: '[channel name/id]',
    aliases: ['channel-info'],
    description: 'Get info about channel',
    example: ['channel bot-commands', 'channel #bot-commands', 'channel 513998704911450136'],
    guildOnly: true,
	
	async execute(message, args, client) {

        let channel = message.guild.channels.get(args[0]) || message.guild.channels.find(c=> c.name === args[0]) || message.mentions.channels.first();
        if (!channel) {
            channel = message.channel;
        }

        if (channel.nsfw === true) {
            nsfw = 'Yes';
        } else if (channel.nsfw === false) {
            nsfw = 'No';
        }
        
		const embed = new Discord.RichEmbed()

        .setAuthor(`Info about #${channel.name} | ${channel.id}`)
        .addField('❯ Info',`• Type: ${channel.type.toUpperCase()}` + `\n` +
            `• Topic ${channel.topic ? channel.topic : 'None'}` + `\n` +
            `• NSFW: ${nsfw}` + `\n` +
            `• Creation Date: ${moment(channel.createdAt).format('D-MM-YY, k:mm')}`)
        .setThumbnail(message.guild.iconURL);
        
        message.channel.send({embed})
	},
};
