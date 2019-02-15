const { Argument, Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { paginate } = require('../../util/index.js');
const { timeString } = require('../../util/index.js');

class QueueCommand extends Command {
	constructor() {
		super('queue', {
			aliases: ['queue', 'q', 'nowplaying', 'np'],
			description: {
				content: 'Shows you the current queue.',
				usage: '[page]',
				examples: ['1', '3']
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'page',
					match: 'content',
					type: Argument.compose(str => str.replace(/\s/g, ''), Argument.range(Argument.union('number', 'emojint'), 1, Infinity)),
					default: 1
				}
			]
		});
	}

	async exec(message, { page }) {

		const queue = this.client.music.queues.get(message.guild.id);
		const current = await queue.current();
		const tracks = [(current || { track: null }).track].concat(await queue.tracks()).filter(track => track);
		if (!tracks.length) return message.util.send(`**No Queue:** ${this.client.emojis.get('525237247599968278')}`);
		const decoded = await this.client.music.decode(tracks);
		const totalLength = decoded.reduce((prev, song) => prev + song.info.length, 0);
		const paginated = paginate({items: decoded.slice(1), page});
		let index = (paginated.page - 1) * 10;

		const embed = new MessageEmbed()
			.setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL()).setColor('#8387db')
			.setDescription(`**NOW PLAYING** \n\n`+

				`**❯** [${decoded[0].info.title}](${decoded[0].info.uri}) (${timeString({seconds: current.position})}/${timeString({seconds: decoded[0].info.length})}) \n\n` +

				`**SONG QUEUE${paginated.page > 1 ? `, PAGE ${paginated.page}` : ''}** \n\n` +

				`${paginated.items.length ? paginated.items.map(song => `**${++index}.** [${song.info.title}](${song.info.uri}) (${timeString({seconds: song.info.length})})`).join('\n') : 'No Queue'} \n\n` +

				`**TOTAL QUEUE TIME** ${timeString({seconds: totalLength})}
			`);
		if (paginated.maxPage > 1) embed.setFooter('Use queue <page> to view a specific page');

		return message.util.send(embed);
	}
}
module.exports = QueueCommand;