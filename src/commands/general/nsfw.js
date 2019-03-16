const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

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

        if (message.channel.id !== '555369247161843712') {
            const att = new MessageEmbed().setImage('https://images-ext-1.discordapp.net/external/oh9rSfiKmoYaO46eXnDWDHCtMJOq9Ug6mfkL3p9y1vw/%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjYxMjYwfQ/https/images.unsplash.com/photo-1471871480126-59ab253c49e9?width=799&height=533');
            return message.channel.send(att);
        }

        if (!query) {
            query = process.env.QUERY
        }
        query = query.toLowerCase().replace(/[^a-z0-9]/g, '');
        const page = Math.floor(Math.random() * 100) + 1;
        const image = Math.floor(Math.random() * 100) + 1;
        try {
            const res = await fetch(`https://api.imgur.com/3/gallery/r/${query}/all/${page}`, { method: 'GET', headers: { Authorization: `Client-ID ${process.env.IMGUR}` }});
            const data = await res.json();
            const embed = this.client.util.embed().setImage(data.data[image].link);
            return message.channel.send(embed);
        } catch {}
    }
}

module.exports = ImgurCommand;