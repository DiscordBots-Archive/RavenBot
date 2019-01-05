const Discord = require('discord.js');

module.exports = {
    name: 'tags',
    type: 'Docs',
    usage: ' ',
    aliases: ['alltags'],
	description: 'List of all tags',
    guildOnly: true,
    
	async execute(message, args, client) {
        
        const tagList = await client.Tags.findAll({ attributes: ['name'] });
        const tagString = tagList.map(t => t.name).join('`, `') || 'No tags set';
    
        const embed = new Discord.RichEmbed()
        .setColor('#9a1ceb')
        .setTitle('List of all Docs (Tags)')
        .setDescription('`' + tagString + '`')
        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send({embed});
	},
};