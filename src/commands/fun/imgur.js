const { Command } = require('discord-akairo');
const qs = require('querystring');
const fetch = require('node-fetch');

class ImgurImageCommand extends Command {
    constructor() {
        super('imgur', {
            aliases: ['imgur'],
            category: 'fun',
            args: [
                {
                    id: 'query',
                    match: 'content',
                    default: 'nature'
                }
            ],
            description: {
                content: 'Searches imgur images.',
                usage: '<query>',
                examples: ['cat', 'beach', 'nature']
            }
        })
    }

    async exec(message, { query }) {

        try {
            const page = Math.floor(Math.random() * 50) + 1;
            const image = Math.floor(Math.random() * 50) + 1;
            const queryString = qs.stringify({ q: query.replace(/[^a-zA-Z0-9]+/gi, ' ') });
            const res = await fetch(`https://api.imgur.com/3/gallery/search/all/${page}?${queryString}`, { method: 'GET', headers: { Authorization: `Client-ID ${process.env.IMGUR}` }});
            const data = await res.json();
            return message.util.send(data.data[image].link);
        } catch {} // eslint-disable-line
    }
}

module.exports = ImgurImageCommand;