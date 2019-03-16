const { Command } = require('discord-akairo');
const qs = require('querystring');
const fetch = require('node-fetch');

class ImgurCommand extends Command {
    constructor() {
        super('nsfw', {
            aliases: ['nsfw'],
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

        const page = Math.floor(Math.random() * 19) + 1;
        //const queryString = qs.stringify({ q: query });
        const res = await fetch(`https://api.imgur.com/3/gallery/r/boobs/top/all/200`, { method: 'GET', headers: { Authorization: `Client-ID ${process.env.IMGUR}` }});
        const data = await res.json();

        //console.log(data);
        console.log(data.data[page].link);
        return message.channel.send(data.data[page].link);
    }
}

module.exports = ImgurCommand;