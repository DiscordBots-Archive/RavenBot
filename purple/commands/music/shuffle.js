const { Command } = require('discord-akairo');


class ShuffleCommand extends Command {
	constructor() {
		super('shuffle', {
			aliases: ['shuffle'],
			description: {
				content: 'Shuffles the queue.'
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2
		});
	}

	async exec(message) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply(`you have to be in a voice channel first ${this.client.emojis.get('545968755423838209')}`);
		}
		const queue = this.client.music.queues.get(message.guild.id);
		await queue.shuffle();

		return message.util.send(`**Shuffled Queue** ${this.client.emojis.get('545870932019773480')}`);
	}
}
module.exports = ShuffleCommand;