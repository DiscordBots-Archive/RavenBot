const { Command } = require('discord-akairo');
const Tags = require('../../models/Tags');
const { MessageEmbed } = require('discord.js');

class TagListCommand extends Command {
	constructor() {
		super('tag-list', {
			aliases: ['tags'],
			category: 'tags',
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member'
				}
			],
			description: { content: 'Lists all server tags.' }
		});
	}

	async exec(message, { member }) {
		if (member) {
			const tags = await Tags.findAll({ where: { authorID: member.id, guildID: message.guild.id } });
			if (!tags.length) {
				if (member.id === message.author.id) return message.util.reply('you don\'t have any tags.');
				return message.util.reply(`**${member.displayName}** doesn't have any tags.`);
			}
			const embed = new MessageEmbed()
				.setColor(0x8387db)
				.setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
				.setDescription(tags.map(tag => `\`${tag.name}\``).sort().join(', '));

			return message.util.send(embed);
		}
		const tags = await Tags.findAll({ where: { guildID: message.guild.id } });
		if (!tags.length) return message.util.send(`**${message.guild.name}** doesn't have any tags. Why not add some?`);

		const hoistedTags = tags.filter(tag => tag.hoisted).map(tag => `\`${tag.name}\``).sort()
			.join(', ');

		const userTags = tags.filter(tag => !tag.hoisted).filter(tag => tag.authorID === message.author.id).map(tag => `\`${tag.name}\``)
			.sort()
			.join(', ');

		const embed = new MessageEmbed().setColor(0x8387db)
			.setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL());

		if (hoistedTags) embed.addField('❯ Tags', hoistedTags);
		if (userTags) embed.addField(`❯ ${message.member.displayName}'s tags`, userTags);

		return message.util.send(embed);
	}
}

module.exports = TagListCommand;
