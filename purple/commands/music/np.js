const { Command } = require('discord-akairo');
const YouTube = require('simple-youtube-api');
const { MessageEmbed } = require('discord.js');
const youtube = new YouTube(process.env.YOUTUBE_API);

class NPCommand extends Command {
    constructor() {
        super('np', {
            aliases: ['np', 'now-playing'],
            description: {
                content: 'Stops music and leaves voice channel',
            },
            category: 'music',
            channel: 'guild',
            typing: true,
            ratelimit: 2
        });
    };

    async exec(message) {

        if (!this.client.Queue) return message.util.send(`*There is nothing playing!*`)

        const url = await this.client.Queue.songs[0].url;
        const video = await youtube.getVideo(url);
        const embed = new MessageEmbed().setAuthor(video.channel.raw.snippet.channelTitle, `https://cdn.discordapp.com/emojis/544469282952708096.png`, `https://www.youtube.com/channel/${video.channel.raw.snippet.channelId}`)
        .setThumbnail(video.thumbnails.default.url).setColor('#ee0808')
        .setTitle(video.title).setURL(`https://www.youtube.com/watch?v=${video.id}`);
        return message.util.send('Now Playing', { embed });
    };
};
module.exports = NPCommand;