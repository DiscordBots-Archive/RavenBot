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
                const embed = new MessageEmbed().setAuthor('YouTube Search').setColor('RED')
                .setDescription(`${videos.map(video_ => `**${++index} -** ${video_.title}`).join('\n')}`);

                const m = await message.channel.send(embed);

                const response = await message.channel.awaitMessages(msg => msg.content > 0 && msg.content < 11 && msg.author.id === message.author.id, {
                    max: 1, time: 15000
                });
                if (!response || response.size !== 1) return m.delete();
                const res = response.first();
                if (parseInt(res) > 10) return;

                const videoIndex = parseInt(res);

                video = await youtube.getVideoByID(videos[videoIndex - 1].id);

            } catch (err) {
                return message.channel.send(`*I could not find anything!*` + err);
            }
        }
        return this.client.handleVideo({ message, video, voiceChannel });
    };
};
module.exports = SearchCommand;