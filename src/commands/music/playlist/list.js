const { Argument, Control, Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { paginate, timeString } = require('../../../util/Base');
const Playlist = require('../../../models/Playlist');

class PlaylistListCommand extends Command {
	constructor() {
		super('playlist-list', {
			category: 'music',
			description: {
				content: 'Displays all playlists (from a specific user).',
				usage: '[member]'
			},
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member'
				},
				{
					id: 'page',
					type: Argument.compose(str => str.replace(/\s/g, ''), Argument.range(Argument.union('number', 'emojint'), 1, Infinity))
				}
			]
		});
	}

	async exec(message, { member, page }) {
		const where = member ? { userID: member.id, guildID: message.guild.id } : { guildID: message.guild.id };
		const playlists = await Playlist.findAll({ where: where });
		if (!playlists.length) return message.util.send(`${member ? `${member.displayName}` : `${message.guild.name}`} doesn't have any playlists.`);
		const paginated = paginate({items: playlists, page});

		const embed = new MessageEmbed().setColor(3447003)
			.setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
			.setDescription([
				`**Playlists${paginated.page > 1 ? `, page ${paginated.page}` : ''}**`,
				`${paginated.items.map(playlist => `** • ** ${playlist.name}`).join('\n')}`
			])
		if (paginated.maxPage > 1) embed.setFooter('use playlist list <member> <page> to view a specific page');

		return message.util.send(embed);
	}
}

module.exports = PlaylistListCommand