const { Command } = require('discord-akairo');

class PauseCommand extends Command {
	constructor() {
		super('pause', {
			aliases: ['pause'],
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			description: { content: 'Pauses the queue.' }
		});
	}

	async exec(message) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply(`you have to be in a voice channel ${this.client.emojis.get('545968755423838209')}`);
		};
		const queue = this.client.music.queues.get(message.guild.id);
		await queue.player.pause();

		return message.util.send(`**Paused** ${this.client.emojis.get('545873319426260993')}`);
	}
}

module.exports = PauseCommand;