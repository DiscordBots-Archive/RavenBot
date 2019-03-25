const { Argument, Control, Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { paginate, timeString } = require('../../../util/Base');
const Playlist = require('../../../models/Playlist');

class PlaylistShowCommand extends Command {
	constructor() {
		super('playlist-show', {
			aliases: ['psh'],
			category: 'music',
			description: {
				content: 'Displays songs from a playlist.',
				usage: '<playlist> [page]'
			},
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					id: 'playlist',
					content: 'match',
					type: 'playlist',
					prompt: {
						start: `what playlist do you want information on?`,
						retry: (msg, args, { phrase }) => `a playlist with the name **${phrase}** does not exist.`
					}
				},
				{
					id: 'page',
					match: 'rest',
					type: Argument.compose(str => str.replace(/\s/g, ''), Argument.range(Argument.union('number', 'emojint'), 1, Infinity)),
					default: 1
				}
			]
		});
	}

	async exec(message, { playlist, page }) {
		if (!playlist.songs.length) return message.util.send('This playlist has no songs!');
		const decoded = await this.client.music.decode(playlist.songs);
		// TODO: remove hack
		const totalLength = decoded.reduce((prev, song) => prev + song.info.length, 0); // tslint:disable-line
		const paginated = paginate({items: decoded, page});
		let index = (paginated.page - 1) * 10;

		const embed = new MessageEmbed().setColor(3447003)
			.setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
			.setDescription([
				`**Song list${paginated.page > 1 ? `, page ${paginated.page}` : ''}**`,
				'',
				`${paginated.items.map(song => `**${++index}.** [${song.info.title}](${song.info.uri}) (${timeString({seconds: song.info.length})})`).join('\n')}`,
				'',
				`**Total list time:** ${timeString({seconds: totalLength})}`
			])
		if (paginated.maxPage > 1) embed.setFooter('Use playlist show <playlist> <page> to view a specific page.');

		return message.util.send(embed);
	}
}

module.exports = PlaylistShowCommand