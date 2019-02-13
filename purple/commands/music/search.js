const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.YOUTUBE_API);

class SearchCommand extends Command {
    constructor() {
        super('search', {
            aliases: ['search'],
            description: {
                content: 'Skips the currently playing song.',
            },
            category: 'music',
            channel: 'guild',
            typing: true,
            ratelimit: 2,
            args: [
                {
                    id: 'searchstring',
                    match: 'rest',
                    promt : {
                        start: message => `${message.author}, what would you like to search ?`
                    }
                }
            ]
        });
    };

    async exec(message, { searchString }) {

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.util.send(`*${message.author}, you need to be in a voice channel to play music!*`);

        const url = searchString ? searchString.replace(/<(.+)>/g, '$1') : '';

        let video;
        try {
            video = await youtube.getVideo(url);
        } catch (error) {
            try {
                let videos = await youtube.searchVideos(searchString, 10);
                let index = 0;
                const embed = new MessageEmbed().setAuthor('YouTube Search')
                .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`);

                const m = await message.channel.send(embed);

                let response;
                try {
                    response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                        maxMatches: 1,
                        time: 15000,
                        errors: ['time']
                    });
                } catch (err) {
                    m.delete();
                }

                const videoIndex = parseInt(response.first().content);

                video = await youtube.getVideoByID(videos[videoIndex - 1].id);

            } catch (err) {
                return msg.channel.send(`*I could not find anything!*`);
            }
        }
        return this.client.handleVideo({ message, video, voiceChannel });
    };
};
module.exports = SearchCommand;