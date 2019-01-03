module.exports = {
    name: 'edittag',
    type: 'Docs',
    aliases: ['edit'],
	usage: '[tag name] [new data]',
    description: 'Add some more new content',
    args: true,
    guildOnly: true,
    
	async execute(message, args, client) {
        const tagName = args[0];
        const tagDescription = args.slice(1).join(' ');
    
        const affectedRows = await client.Tags.update({ description: tagDescription }, { where: { name: tagName } });
        if (affectedRows > 0) {
            return message.channel.send(`Docs **${tagName}** has been edited <:notlikecat:529505687773118484>`);
        }
        return; //message.channel.send(`Could not find any docs with name ` + tagName);
	},
};
