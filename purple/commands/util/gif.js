const { Command } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const GphApiClient = require('giphy-js-sdk-core');
const gif = GphApiClient(process.env.GHIPY);

class GifCommand extends Command {
    constructor() {
        super('gif', {
            aliases: ['gif'],
            description: {
                content: 'null',
                usage: '<null>',
                examples: ['null']
            },
            category: 'util',
            channel: 'guild',
            ratelimit: 2,
            args: [
                {
                    id: 'query',
                    match: 'rest'
                }
            ]
        });
    };

    async exec(message, { query }) {

        let send;
        try {
            if (query) {
                const gifs = await gif.search('gifs', { "q": query, "limit" : 1 });
                for (const data of gifs.data) {
                    //console.log(data.images.fixed_height.url);
                    send = data.images.fixed_height.url;
                }
            } else {
                const random = await gif.random('gifs', { "limit" : 1 });
                //console.log(random.data.images.fixed_height_downsampled.gif_url)
                send = random.data.images.fixed_height_downsampled.gif_url;
            }
    
            const embed = new MessageAttachment(send);
            return message.util.send(embed);
            
        } catch {}

    };
};
module.exports = GifCommand;