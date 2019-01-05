const Discord = require('discord.js');

module.exports = {
    name: 'removetag',
    type: "Docs",
    aliases: ['deletetag'],
	usage: '[tag name]',
	description: 'Remove a Doc (Tag)',
    args: true,
    guildOnly: true,

	async execute(message, args, client) {
        
        const tagName = args[0];
        const rowCount = await client.Tags.destroy({ where: { name: tagName } });
        if (!rowCount) return message.channel.send('That tag did not exist <:notlikecat:529505687773118484>');
        return message.channel.send(`Docs **${tagName}** has been deleted <:notlikecat:529505687773118484>`);
	},
};
