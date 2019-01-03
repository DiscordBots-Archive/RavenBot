const Discord = require('discord.js');

module.exports = {
    name: 'docs',
    type: 'Docs',
    aliases: ['tag'],
	usage: '[tag name]',
    description: 'Get the content of any tag from database',
    args: true,
    guildOnly: true,

	async execute(message, args, client) {
        const tagName = args[0];
        const tag = await client.Tags.findOne({where: { name: tagName } });
        if (tag) {
            tag.increment('usage_count');
            return message.channel.send(tag.get('description'));
        }
        return; //message.channel.send(`Could not find tag + tagName);
	},
};
