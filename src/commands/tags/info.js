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
			.setColor(3447003)
			.addField('❯ Name', tag.name)
			.addField('❯ User', user ? `${user.tag} (ID: ${user.id})` : "Couldn't fetch user.")
			.addField('❯ Guild', guild ? `${guild.name}` : "Couldn't fetch guild.")
			.addField('❯ Aliases', tag.aliases.length ? tag.aliases.map(t => `\`${t}\``).sort().join(', ') : 'No aliases.')
			.addField('❯ Uses', tag.uses)
			.addField('❯ Created at', moment.utc(tag.createdAt).format('DD/MM/YYYY hh:mm:ss'))
			.addField('❯ Modified at', moment.utc(tag.updatedAt).format('DD/MM/YYYY hh:mm:ss'));
		if (lastModifiedBy) {
			embed.addField('❯ Last modified by', lastModifiedBy ? `${lastModifiedBy.tag} (ID: ${lastModifiedBy.id})` : "Couldn't fetch user.");
		}

		return message.util.send(embed);
	}
}

module.exports = TagInfoCommand;