const { Command } = require('discord-akairo');

class ResumeCommand extends Command {
	constructor() {
		super('resume', {
			aliases: ['resume'],
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			description: { content: 'Resumes the queue.' }
		});
	}

	async exec(message) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply(`you have to be in a voice channel.`);
		}
		const queue = this.client.music.queues.get(message.guild.id);
		await queue.player.pause(false);

		return message.util.send(`**Resumed**`);
	}
}

module.exports = ResumeCommand;
