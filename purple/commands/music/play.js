const { Command } = require('discord-akairo');
const Util = require('../../util/index.js')
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.YOUTUBE_API);

class PlayCommand extends Command {
    constructor() {
        super('play', {
           aliases: ['play'],
           description: {
               content: 'Plays music',
               usage: '<query>'
           },
           category: 'music',
           typing: true,
           ratelimit: 2,
           args: [
               {
                   id: 'searchString',
                   match: 'rest'
               }
           ]
        });
    }

    async exec(message, {searchString}) {
        const voice = message.member.voice.channel;
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
        return Util.handleVideo({ message, video, voice });
    }
}

module.exports = PlayCommand;