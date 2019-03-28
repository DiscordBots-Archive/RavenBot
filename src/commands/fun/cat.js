const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class CatImageCommand extends Command {
    constructor() {
        super('cat-image', {
            aliases: ['cat', 'cat-img'],
            category: 'fun',
            clientPermissions: ['EMBED_LINKS', 'ATTACH_FILES'],
            description: {
                content: 'Displays a random cat.',
            }
        })
    }

    async exec(message) {

        const page = Math.floor(Math.random() * 1000) + 1;
        try {
            const res = await fetch(`https://api.pexels.com/v1/search?query=cat&per_page=1&page=${page}`, { method: 'GET', headers: { Authorization: process.env.PEXEL } });
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

module.exports = CatImageCommand;
