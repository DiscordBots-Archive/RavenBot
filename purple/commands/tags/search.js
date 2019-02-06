const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');


class SearchTagCommand extends Command {
	constructor() {
		super('tag-alias', {
            //aliases: ['alias'],
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
					match: 'content',
					type: 'lowercase',
					prompt: {
						start: (message) => `*${message.author}, what would you like to search for?*`
					}
				}
			]
		});
	}

	async exec(message, { name }) {
        const data = await this.client.Tags.findOne({where: { tag_name: name, guild: message.guild.id } });
        const alias = tag.get('name');
	}
}
module.exports = SearchTagCommand;