const { Command } = require('discord-akairo');
const qs = require('querystring');
const fetch = require('node-fetch');

class GifCommand extends Command {
	constructor() {
		super('gif-search', {
			aliases: ['gif', 'giphy'],
			category: 'fun',
			clientPermissions: ['ATTACH_FILES', 'EMBED_LINKS'],
			args: [
				{
					id: 'query',
					match: 'content'
				}
			],
			description: {
				content: 'Displays or searches a random gif.',
				usage: '<query>',
				examples: ['cat', 'dog']
			}
		});
	}

	async exec(message, { query }) {
		try {
			if (query) {
				const queryString = qs.stringify({ q: query.replace(/[^a-zA-Z0-9]+/gi, ' ') });
				const res = await fetch(`http://api.giphy.com/v1/gifs/search?${queryString}`, { method: 'GET', headers: { api_key: process.env.GIPHY } });
				const gif = await res.json();
				for (const data of gif.data) {
					const embed = this.client.util.embed().setColor(0X8387DB).setImage(data.images.original.url);
					return message.channel.send(embed);
				}
			}
			const res = await fetch('http://api.giphy.com/v1/gifs/random', { method: 'GET', headers: { api_key: process.env.GIPHY } });
			const random = await res.json();
			const embed = this.client.util.embed().setColor(0X8387DB).setImage(random.data.images.original.url);
			return message.channel.send(embed);
        } catch {} // eslint-disable-line
	}
}

module.exports = GifCommand;
