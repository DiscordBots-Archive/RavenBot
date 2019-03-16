const { Command } = require('discord-akairo');
const qs = require('querystring');
const fetch = require('node-fetch');

class ImgurImageCommand extends Command {
    constructor() {
        super('imgur', {
            aliases: ['imgur'],
            category: 'general',
            args: [
                {
                    id: 'query',
                    match: 'content'
                }
            ]
        })
    }

    async exec(message, { query }) {

        const queryString = qs.stringify({ q: query.replace(/[^a-zA-Z0-9]+/gi, ' ') });
        const res = await fetch(`https://api.imgur.com/3/gallery/search/top/all/1?${queryString}`, { method: 'GET', headers: { Authorization: `Client-ID ${process.env.IMGUR}` }});
        const data = await res.json();
        console.log(data);
    }
}

module.exports = ImgurImageCommand;