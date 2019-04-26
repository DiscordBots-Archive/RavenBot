const { Argument, Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { paginate, timeString } = require('../../util/Base');

class QueueCommand extends Command {
	constructor() {
		super('queue', {
			aliases: ['queue', 'q', 'nowplaying', 'np'],
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'page',
					match: 'content',
					type: Argument.compose((_, str) => str.replace(/\s/g, ''), Argument.range(Argument.union('number', 'emojint'), 1, Infinity)),
					default: 1
				}
			],
			description: {
				content: 'Shows you the current queue.',
				usage: '[page]',
				examples: ['1', '3']
			}
		});
	}

	async exec(message, { page }) {
		const queue = this.client.music.queues.get(message.guild.id);
		const current = await queue.current();
		const tracks = [(current || { track: null }).track].concat(await queue.tracks()).filter(track => track);
		if (!tracks.length) return message.util.send('**No queue.**');
		const decoded = await this.client.music.decode(tracks);
		const totalLength = decoded.reduce((prev, song) => prev + song.info.length, 0);
		const paginated = paginate({ items: decoded.slice(1), page });
		let index = (paginated.page - 1) * 10;

		const embed = new MessageEmbed().setColor('#8387db')
			.setAuthor(`Queue for ${message.guild.name}`, message.guild.iconURL())

			.setDescription(`**NOW PLAYING ${this.client.emojis.get('545628508962029569')}** \n\n` +

			`**❯** [${decoded[0].info.title}](${decoded[0].info.uri}) (${timeString({ seconds: current.position })}/${timeString({ seconds: decoded[0].info.length })}) \n\n` +

			`**Queue${paginated.maxPage > 1 ? `, Page ${paginated.page}/${paginated.maxPage}` : ''}** \n\n` +

			`${paginated.items.length ? paginated.items.map(song => `**${++index}.** [${song.info.title}](${song.info.uri}) (${timeString({ seconds: song.info.length })})`).join('\n') : 'None'}\n\n` +

			`Time~ ${timeString({ seconds: totalLength })}${decoded.length > 10 ? `, Songs~ ${decoded.length}` : ''}`);

		if (paginated.maxPage > 1) embed.setFooter('`queue <page>` to view a specific page');

		return message.util.send(embed);
	}
}

module.exports = QueueCommand;
