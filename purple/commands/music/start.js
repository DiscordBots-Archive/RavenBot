const { Command } = require('discord-akairo');

class StartCommand extends Command {
	constructor() {
		super('start', {
			aliases: ['start'],
			description: {
				content: 'Joins and starts the queue.',
				usage: '[--force/-f]',
				examples: ['--force', '-f']
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'force',
					match: 'flag',
					flag: ['--force', '-f']
				}
			]
		});
	};

	async exec(message, { force }) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply(`you have to be in a voice channel ${this.client.emojis.get('545968755423838209')}`);
		} else if (!message.member.voice.channel.joinable) {
			return message.util.reply(`I don't have permission to enter this voice channel ${this.client.emojis.get('545968755423838209')}`);
		} else if (!message.member.voice.channel.speakable) {
			return message.util.reply(`I don't have permission to talk in this voice channel ${this.client.emojis.get('545968755423838209')}`);
		};
		const queue = this.client.music.queues.get(message.guild.id);
		if (!message.guild.me.voice || !message.guild.me.voice.channel || force) {
			await queue.player.join(message.member.voice.channel.id);
			message.util.send(`**Started** ${this.client.emojis.get('545628508962029569')}`);
		};
		if ((!queue.player.playing && !queue.player.paused) || force) await queue.start();
	};
};
module.exports = StartCommand;