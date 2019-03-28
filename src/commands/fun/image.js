const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const qs = require('querystring');

class ImageCommand extends Command {
    constructor() {
        super('image', {
            aliases: ['image', 'img'],
            category: 'fun',
            clientPermissions: ['EMBED_LINKS', 'ATTACH_FILES'],
            args: [
                {
                    id: 'query',
                    match: 'content'
                }
            ],
            description: {
                content: 'Displays or searches a random image.',
                usage: '<query>',
                examples: ['cat', 'dog', 'fox', 'sky']
            }
        })
    }

    async exec(message, { query }) {
        const page = Math.floor(Math.random() * 1000) + 1;
        try {
            if (query) {
                const queryString = qs.stringify({ query: query.replace(/[^a-zA-Z0-9]+/gi, ' ') });
                const res = await fetch(`https://api.pexels.com/v1/search?${queryString}&per_page=1&page=${page}`, { method: 'GET', headers: { Authorization: process.env.PEXEL } });
                const data = await res.json();
                for (const photo of data.photos) {
                    const title = photo.url.slice(29, - (photo.id.toString().length + 2)).replace(/-/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())
                    const embed = this.client.util.embed().setTitle(title)
                    .setImage(photo.src.original).setURL(photo.src.original);
                    return message.util.send(embed);
                }
            }
            const res = await fetch(`https://api.pexels.com/v1/curated?per_page=1&page=${page}`, { method: 'GET', headers: { Authorization: process.env.PEXEL } });
            const data = await res.json();
            for (const photo of data.photos) {
                const title = photo.url.slice(29, - (photo.id.toString().length + 2)).replace(/-/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())
                const embed = this.client.util.embed().setTitle(title)
                .setImage(photo.src.original).setURL(photo.src.original);
                return message.util.send(embed);
            }
        } catch {} // eslint-disable-line
    }
}

module.exports = ImageCommand;