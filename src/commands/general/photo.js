const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const qs = require('querystring');

class PhotoCommand extends Command {
    constructor() {
        super('photo', {
            aliases: ['photo', 'canvas'],
            category: 'general',
            clientPermissions: ['EMBED_LINKS', 'ATTACH_FILES'],
            args: [
                {
                    id: 'query',
                    match: 'content'
                }
            ],
            description: {
                content: 'Searches any photo.',
            }
        })
    }

    async exec(message, { query }) {

        const page = Math.floor(Math.random() * 19) + 1;
        const queryString = qs.stringify({ query: query.replace(/[^a-zA-Z0-9]+/gi, ' ') });
        const res = await fetch(`https://api.unsplash.com/search/photos?per_page=1&page=${page}&${queryString}&${process.env.UNSPLASH}`);
        const data = await res.json();
        for (const image of data.results) {
            const embed = this.client.util.embed()
            embed.setImage(image.urls.raw);
            return message.util.send(embed);
        }
    }
}

module.exports = PhotoCommand;