const { Command } = require('discord-akairo');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.YOUTUBE_API);

class PlayCommand extends Command {
    constructor() {
        super('play', {
            aliases: ['play', 'p'],
            description: {
                content: 'Plays a song with the given name or url.',
                usage: '<query>/<yt-url>',
                examples: ['Shape of you', 'https://youtube.com/watch?v=query']
            },
            category: 'music',
            channel: 'guild',
            typing: true,
            ratelimit: 2,
            args: [
                {
                    id: 'searchString',
                    match: 'rest',
                    default: 'https://www.youtube.com/watch?v=F1_bv6Rac6A'
                    
                }
            ]
        });
    };

    async exec(message, {searchString}) {
        
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.util.send(`*${message.author}, you need to be in a voice channel to play music!*`);

        const url = searchString ? searchString.replace(/<(.+)>/g, '$1') : '';

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				let video_ = await youtube.getVideoByID(video.id);
				await this.client.handleVideo({ message, video: video_, voiceChannel, playlist: true });
			}
            return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
            
		} else {
            let video;
            try {
                video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    let videos = await youtube.searchVideos(searchString, 2);
                    const videoIndex = parseInt(1);
                    video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    return message.channel.send(`*${message.author}, I could not find anything!*`);
                }
            }
            return this.client.handleVideo({ message, video, voiceChannel });
        }

    };
};
module.exports = PlayCommand;