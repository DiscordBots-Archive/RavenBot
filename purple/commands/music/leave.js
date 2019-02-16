const { Command } = require('discord-akairo');

class LeaveCommand extends Command {
	constructor() {
		super('leave', {
			aliases: ['leave'],
			description: {
				content: 'Leaves the voice channel (`--clear` to clear the queue before leaving)',
				usage: '[--clear/-c]',
				examples: ['--clear', '-c']
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'clear',
					match: 'flag',
					flag: ['--clear', '-c']
				}
			]
		});
	}

	async exec(message, { clear }) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply(`you have to be in a voice channel ${this.client.emojis.get('545968755423838209')}`);
		}
		const DJ = message.member.roles.has(this.client.settings.get(message.guild.id, 'djRole', undefined));
		const queue = this.client.music.queues.get(message.guild.id);
		if (clear && DJ) await queue.clear();
		await queue.player.stop();
		//await queue.player.destroy();
		if (message.guild.me.voice || message.guild.me.voice.channel) await queue.player.leave();

		return message.util.send(`**${DJ && clear ? 'Cleared' : 'Stopped'} Queue** ${this.client.emojis.get('545873319426260993')}`);
	}
}
module.exports = LeaveCommand;