const { Command } = require('discord-akairo');

class SkipCommand extends Command {
    constructor() {
        super('skip', {
            aliases: ['skip'],
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
        if (!message.member.voice.channel) return message.util.send(`*You are not in a voice channel!*`);
        if (!this.client.Queue) return message.util.send(`*There is nothing playing that I could skip for you!*`);
        await this.client.Queue.connection.dispatcher.end(`Skip command has been used by ${message.author.tag}`);
    };
};
module.exports = SkipCommand;