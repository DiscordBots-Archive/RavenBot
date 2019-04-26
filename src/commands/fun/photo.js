const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const qs = require('querystring');

class PhotoCommand extends Command {
	constructor() {
		super('photo', {
			aliases: ['photo', 'canvas'],
			category: 'fun',
			clientPermissions: ['EMBED_LINKS', 'ATTACH_FILES'],
			args: [
				{
					id: 'query',
					match: 'content'
				}
			],
			description: {
				content: 'Searches any photo.',
				usage: '<query>',
				examples: ['cat', 'owl', 'dog']
			}
		});
	}

	async exec(message, { query }) {
		try {
			const page = Math.floor(Math.random() * 20) + 1;
			const queryString = qs.stringify({ query: query.replace(/[^a-zA-Z0-9]+/gi, ' ') });
			const res = await fetch(`https://api.unsplash.com/search/photos?per_page=1&page=${page}&${queryString}&${process.env.UNSPLASH}`);
			const data = await res.json();
			for (const image of data.results) {
				const embed = this.client.util.embed();
				embed.setImage(image.urls.raw);
				return message.util.send(embed);
			}
        } catch {} // eslint-disable-line
	}
}

module.exports = PhotoCommand;
