const { Argument, Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const url = require('url');
const path = require('path');
const { parse } = require('url');
const { paginate } = require('../../util/index.js');
const { timeString } = require('../../util/index.js');

class SearchCommand extends Command {
	constructor() {
		super('search', {
			aliases: ['search', 'sh'],
			description: {
				content: 'Play a song from literally any source you can think of.',
				usage: '<link/search>',
				examples: ['justin bieber']
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'unshift',
					match: 'flag',
					flag: ['--start', '-s']
				},
				{
					id: 'query',
					match: 'rest',
					type: Argument.compose('string', str => str ? str.replace(/<(.+)>/g, '$1') : ''),
					default: ''
				}
			]
		});
	};

	async exec(message, { query, unshift }) {
		if (!message.member.voice || !message.member.voice.channel) {
			return message.util.reply(`you have to be in a voice channel ${this.client.emojis.get('545968755423838209')}`);
		} else if (!message.member.voice.channel.joinable) {
			return message.util.reply(`I don't have permission to enter this voice channel ${this.client.emojis.get('545968755423838209')}`);
		} else if (!message.member.voice.channel.speakable) {
			return message.util.reply(`I don't have permission to talk in this voice channel ${this.client.emojis.get('545968755423838209')}`);
		};
        
		const res = await this.client.music.load(`ytsearch:${query}`);
		const queue = this.client.music.queues.get(message.guild.id);
        if (!message.guild.me.voice.channel) await queue.player.join(message.member.voice.channel.id);
        
        const paginated = paginate({ items: res.tracks, page: 1, pageLength: 10 });
        let msg;
        let index = 0;
		if (['TRACK_LOADED', 'SEARCH_RESULT'].includes(res.loadType)) {

            const embed = new MessageEmbed().setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .addField(`SEARCH RESULT`, `${paginated.items.map(track => `**${++index}.** ${track.info.title}`).join('\n\n')}`)
            .setColor('#8387db').setFooter('Enter Number Only')
            const m = await message.channel.send(embed);

            const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id && msg.content > 0 && msg.content < 11, {
                max: 1,
                time: 30000
            });

            if (!responses || responses.size !== 1) {
                return m.delete();
            };
            const response = responses.first();

            const input = parseInt(response.content);

            await queue.add(res.tracks[input - 1].track);

            msg = res.tracks[input - 1].info.title; m.delete();

		} else {
			return message.util.send("I couldn't find what you were looking for");
        };
        if (!queue.player.playing && !queue.player.paused) await queue.start();

        return message.util.send(`${this.client.emojis.get('545628508962029569')} **Queued up:** \`${msg}\``);
	};
};
module.exports = SearchCommand;