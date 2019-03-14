const { Command } = require('discord-akairo');
const fetch = require('node-fetch');

class DogImageCommand extends Command {
    constructor() {
        super('dog-image', {
            aliases: ['dog', 'dog-img'],
            category: 'general',
            clientPermissions: ['EMBED_LINKS', 'ATTACH_FILES'],
            description: {
                content: 'Displays a random dog.',
            }
        })
    }

    async exec(message) {

        const page = Math.floor(Math.random() * 1000) + 1;
        const res = await fetch(`https://api.pexels.com/v1/search?query=dog&per_page=1&page=${page}`, { method: 'GET', headers: { Authorization: process.env.PEXEL } });
        const data = await res.json();
        for (const photo of data.photos) {
            const title = photo.url.slice(29, - (photo.id.toString().length + 2)).replace(/-/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())
            const embed = this.client.util.embed().setTitle(title)
            .setImage(photo.src.original).setURL(photo.src.original);
            return message.util.send(embed);
        }
    }
}

module.exports = DogImageCommand;