const { Command } = require('discord-akairo');

class VolumeCommand extends Command {
	constructor() {
		super('setvolume', {
			aliases: ['volume', 'set-vol', 'vol'],
			description: {
                content: 'Set volume of the music (Recommended: 60-70)',
                usage: '<number>',
                examples: ['50', '60', '70']
			},
			category: 'music',
			channel: 'guild',
            ratelimit: 2,
            args: [
                {
                    id: 'amount',
                    type: phrase => {
                        if (!phrase || isNaN(phrase)) return null;
                        const num = parseInt(phrase);
                        if (num < 10 || num > 100) return null;
                        return num;
                    },
                    prompt: {
                        start: message => `${message.author}, what is the limit?`,
                        retry: message => `${message.author}, please provide a valid number...`
                    }
                }
            ]
		});
	};

	async exec(message, { num }) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply(`you have to be in a voice channel ${this.client.emojis.get('545968755423838209')}`);
		}
		const DJ = message.member.roles.has(this.client.settings.get(message.guild.id, 'djRole', undefined));
		const queue = this.client.music.queues.get(message.guild.id);
		if (DJ) {
            await queue.player.setVolume(num);
            return message.util.send(`**Set volume ${num}** (Recommended: 60-70) ${this.client.emojis.get('545873319426260993')}`);
        }
	};
};
module.exports = VolumeCommand;