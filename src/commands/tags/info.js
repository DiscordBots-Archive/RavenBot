const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment'); require('moment-duration-format');

class TagInfoCommand extends Command {
	constructor() {
		super('tag-info', {
			aliases: ['tag-info'],
			category: 'tags',
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					id: 'tag',
					match: 'content',
					type: 'tag',
					prompt: {
						start: `what tag do you want information on?`,
						retry: (message, _, provided, phrase) => `a tag with the name **${provided.phrase}** does not exist.`
					}
				}
			],
			description: {
				content: 'Displays information about a tag.',
				usage: '<tag>'
			}
		});
	}

	async exec(message, { tag }) {

		const user = await this.client.users.fetch(tag.authorID);
		let lastModifiedBy;
		try {
			lastModifiedBy = await this.client.users.fetch(tag.last_modified);
		} catch (error) {
			lastModifiedBy = null;
		}
		const guild = this.client.guilds.get(tag.guildID);
		const embed = new MessageEmbed()
			.setColor(0x8387db)
			.setAuthor(user ? user.tag : "Couldn't Fetch User", user ? user.displayAvatarURL() : null)
			.setTitle(tag.name)
			.addField('Aliases', tag.aliases.length ? tag.aliases.map(t => `\`${t}\``).sort().join(', ') : 'No Aliases')
			.addField('Uses', tag.uses)
			.addField('Created at', moment.utc(tag.createdAt).format('MMM Do YYYY kk:mm'))
			.addField('Modified at', moment.utc(tag.updatedAt).format('MMM Do YYYY, kk:mm'));
		if (lastModifiedBy && lastModifiedBy.id !== tag.authorID) {
			embed.addField('Last modified by', lastModifiedBy ? `${lastModifiedBy.tag}` : "Couldn't Fetch User");
		}

		return message.util.send(embed);
	}
}

module.exports = TagInfoCommand;