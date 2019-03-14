const { Command } = require('discord-akairo');
const GphApiClient = require('giphy-js-sdk-core');
const gif = GphApiClient(process.env.GHIPY);
const qs = require('querystring');

class GifCommand extends Command {
    constructor() {
        super('gif-search', {
            aliases: ['gif', 'ghipy'],
            category: 'general',
            clientPermissions: ['ATTACH_FILES', 'EMBED_LINKS'],
            args: [
                {
                    id: 'query',
                    match: 'content'
                }
            ]
        })
    }

    async exec(message, { query }) {
        if (query) {
            const queryString = qs.stringify({ q: query });
            const res = await fetch(`http://api.giphy.com/v1/gifs/search?${queryString}`, { method: 'GET', headers: { api_key: process.env.GHIPY } });
            const gif = await res.json();
            for (const data of gif.data) {
                const embed = this.client.util.embed().setImage(data.images.original.url);
                return message.channel.send(embed);
            }
        }
        const res = await fetch(`http://api.giphy.com/v1/gifs/random`, { method: 'GET', headers: { api_key: process.env.GHIPY } });
        const random = await res.json();
        const embed = this.client.util.embed().setImage(random.data.images.original.url);
        return message.channel.send(embed);
    }
}

module.exports = GifCommand;