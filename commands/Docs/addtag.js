module.exports = {
    name: 'addtag',
    type: 'Docs',
    aliases: ['add'],
	usage: '[tag name] [data]',
    description: 'Store docs type data',
    args: true,
    guildOnly: true,
    
	async execute(message, args, client) {
        const tagName = args[0];
        const tagDescription = args.slice(1).join(' ');
    
        try {
            const tag = await client.Tags.create({
                name: tagName,
                description: tagDescription,
                username: message.author.username,
            });
            return message.channel.send(`New tag **${tag.name}** added <:notlikecat:529505687773118484>`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.channel.send('That tag already exists <:notlikecat:529505687773118484>');
            }
            return message.channel.send('Something went wrong with adding a tag <:notlikecat:529505687773118484>');
        }
	},
};
