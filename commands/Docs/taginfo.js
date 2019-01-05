const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'taginfo',
    type: 'Docs',
    aliases: ['itag'],
	usage: '[tag name]',
	description: 'Raw Info about a tag',
    args: true,
    guildOnly: true,

	async execute(message, args, client) {

        const tagName = args[0];
        const tag = await client.Tags.findOne({ where: { name: tagName } });
    
        if (tag) {
    
            const embed = new Discord.RichEmbed()
            .setColor('#9a1ceb')
            .setTitle(tagName)
            .addField('Creator : ' + tag.username, 'Date : ' + moment(tag.createdAt).format("DD-MM-YY kk:mm"))
            .setFooter(tag.usage_count + ' times used')
            .setTimestamp()
    
            return message.channel.send({embed})
    
        }
        return; //message.channel.send(`Could not find ` + tagName);
	},
};
