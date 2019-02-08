const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');


class SearchTagCommand extends Command {
	constructor() {
		super('tag-alias', {
			category: 'tag',
			description: {
				content: 'Searches a tag.',
				usage: '<tag>'
			},
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					id: 'name',
					content: 'match',
					type: 'lowercase',
					prompt: {
						start: (message) => `${message.author}, what is the tag name?`
					},
				},
				{
					id: 'content',
					match: 'rest',
					type: 'lowercase',
					prompt: {
						start: message => `${message.author}, what is your new alias?`
					}

				}
			]
		});
	}

	async exec(message, { name, content }) {
		
        if (content && content.length >= 1900) return message.util.reply('*messages have a limit of 2000 characters..*');
        const data = await this.client.Tags.findOne({ where: { tag_name: name, guild: message.guild.id } });
        if (data) {

			if (data.get('user') !== message.author.id) return message.util.reply('*you can only edit your own tags!*');
			
			const affectedRows = await this.client.Tags.update({ tag_name: content }, { where: { name: data.get('name') } });
			if (affectedRows > 0) {
				return message.util.send(`*Alias of **${data.tag_name}** has been edited to **${content}** ...*`);
			}
        } 
		return message.util.send(`*No result found with name **${name}**...*`);
        
	}
}
module.exports = SearchTagCommand;