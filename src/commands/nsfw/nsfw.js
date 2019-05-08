const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const QUERY = ['nsfw']; // add some more xD

class NsfwCommand extends Command {
	constructor() {
		super('nsfw', {
			aliases: ['nsfw'],
			category: 'nsfw',
			args: [
				{
					id: 'query',
					match: 'content'
				}
			],
			description: {
				content: 'Receives random nsfw xD.'
			}
		});
	}

	async exec(message, { query }) {
		if (!message.channel.nsfw) return message.util.send('This command can only be used in NSFW channels.');

		if (!query) query = QUERY[Math.floor(Math.random() * QUERY.length)];
		query = query.replace(/[^a-zA-Z0-9_]/g, '');
		const page = Math.floor(Math.random() * 100) + 1;
		const image = Math.floor(Math.random() * 100) + 1;
		try {
			const res = await fetch(`https://api.imgur.com/3/gallery/r/${query}/all/${page}`, { method: 'GET', headers: { Authorization: `Client-ID ${process.env.IMGUR}` } });
			const data = await res.json();
			const embed = new MessageEmbed().setColor('RANDOM')
				.setTitle(data.data[image].title.toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase()))
				.setURL(data.data[image].link)
				.setImage(data.data[image].link);
			return message.channel.send({ embed });
        } catch {} // eslint-disable-line
	}
}

module.exports = NsfwCommand;
