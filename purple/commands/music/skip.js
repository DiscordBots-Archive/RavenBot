const { Argument, Control, Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { paginate } = require('../../util/index.js');
const { timeString } = require('../../util/index.js');

class SkipCommand extends Command {
	constructor() {
		super('skip', {
			aliases: ['skip', '🚶', '🏃'],
			description: {
				content: 'Skips the amount of songs you specify (defaults to 1)',
				usage: '<num>',
				examples: ['3', '1']
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'force',
					match: 'flag',
					flag: ['--force', '-f']
				},
				Control.if((msg, args) => msg.member.roles.has(this.client.settings.get(msg.guild.id, 'djRole', undefined)) && args.force, [
					{
						id: 'num',
						match: 'rest',
						type: Argument.compose(str => str.replace(/\s/g, ''), Argument.range(Argument.union('number', 'emojint'), 1, Infinity)),
						default: 1
					}
				], [
					{
						id: 'num',
						match: 'rest',
						type: Argument.compose(str => str.replace(/\s/g, ''), Argument.range(Argument.union('number', 'emojint'), 1, 10)),
						default: 1
					}
				])
			]
		});
	}

	async exec(message, { num }) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply('*you have to be in a voice channel first!*');
		}
		const queue = this.client.music.queues.get(message.guild.id);
		let tracks;
		if (num > 1) tracks = await this.client.music.queues.redis.lrange(`playlists.${message.guild.id}`, 0, num - 2);
		const current = await queue.current();
		tracks = [(current || { track: null }).track].concat(tracks).filter(track => track);
		const skip = await queue.next(num);
		if (!skip) {
			await queue.stop();
			return message.util.send(`**Skipped Last Song:** ${this.client.emojis.get('545628508962029569')}`);
		}
		const decoded = await this.client.music.decode(tracks);
		const totalLength = decoded.reduce((prev, song) => prev + song.info.length, 0);
		const paginated = paginate({items: decoded, page: 1, pageLength: 10});
		let index = (paginated.page - 1) * 10;

		const embed = new MessageEmbed()
			.setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL()).setColor('#8387db')
			.setDescription(`**Skipped Songs** \n\n` +

				`${paginated.items.map(song => `**${++index}.** [${song.info.title}](${song.info.uri}) (${timeString({seconds: song.info.length})})`).join('\n')} \n\n` +

				`**Total Skipped Time** ${timeString({seconds: totalLength})}
			`);

		return message.util.send(embed);
	}
}
module.exports = SkipCommand;