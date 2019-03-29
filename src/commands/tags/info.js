const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment'); require('moment-duration-format');
const Tags = require('../../models/Tags');
const { fn, col } = require('sequelize');

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
						retry: (msg, { phrase }) => `a tag with the name **${phrase}** does not exist.`
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
		const position = await Tags.findAll({
			where: { guildID: message.guild.id },
			order: [ [fn('max', col('uses')), 'DESC' ] ],
			group: ['tags.id']
		})
		const index = position.findIndex(i => i.name === tag.name);
		const embed = new MessageEmbed()
			.setColor(0x8387db)
			.setAuthor(user ? user.tag : "Invalid#0000", user ? user.displayAvatarURL() : null)
			.setTitle(tag.name)
			.addField('Aliases', tag.aliases.length ? tag.aliases.map(t => `${t}`).sort().join(', ') : 'No Aliases')
			.addField('Uses', tag.uses).addField('Rank', index + 1)
			.addField('Created', moment.utc(tag.createdAt).format('MMM Do YYYY kk:mm'))
			.addField('Modified', moment.utc(tag.updatedAt).format('MMM Do YYYY, kk:mm'));
		if (lastModifiedBy && lastModifiedBy.id !== tag.authorID) {
			embed.addField('Last Modified', lastModifiedBy ? `${lastModifiedBy.tag}` : "Couldn't Fetch User");
		}

		return message.util.send(embed);
	}
}

module.exports = TagInfoCommand;