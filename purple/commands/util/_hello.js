const { Command } = require('discord-akairo');
const moment = require('moment');
const ms = require('ms');
const ytdl = require('ytdl-core')


class HelloCommand extends Command {
    constructor() {
        super('hello', {
           aliases: ['play'],
           description: {
               conntent: 'Hello Command',
               usage: '[command]'
           },
           category: 'util',
           typing: true,
           ratelimit: 2,
           args: [
               {
                   id: 'query',
                   type: 'string',
                   default: 'https://www.youtube.com/watch?v=F1_bv6Rac6A'
               }
           ]
        });
    }

    async exec(message, {query}) {
        
        const connection = await this.client.channels.get('544379786605363200').join();
        connection.play(ytdl(query, { quality: 'highestaudio' }));
    }
}

module.exports = HelloCommand;