const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

class ImgurCommand extends Command {
    constructor() {
        super('nsfw', {
            aliases: ['nsfw'],
            category: 'owner',
            args: [
                {
                    id: 'query',
                    match: 'content'
                }
            ],
            description: {
                content: 'Receives random nsfw xD.'
            }
        })
    }

    async exec(message, { query }) {

        if (message.channel.id !== '555369247161843712') {
            const embed = new MessageEmbed().setImage('https://images.unsplash.com/photo-1471871480126-59ab253c49e9');
            return message.channel.send(embed);
        }

        if (!query) { query = process.env.QUERY; }
        query = query.replace(/[^a-zA-Z0-9_]/g, '');
        const page = Math.floor(Math.random() * 100) + 1;
        const image = Math.floor(Math.random() * 100) + 1;
        try {
            const res = await fetch(`https://api.imgur.com/3/gallery/r/${query}/all/${page}`, { method: 'GET', headers: { Authorization: `Client-ID ${process.env.IMGUR}` }});
            const data = await res.json();
            return message.channel.send(data.data[image].link);
        } catch {} // eslint-disable-line
    }
}

module.exports = ImgurCommand;