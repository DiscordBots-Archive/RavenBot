const { Command } = require('discord-akairo');

class ResumeCommand extends Command {
    constructor() {
        super('resume', {
            aliases: ['resume'],
            description: {
                content: 'Stops music',
            },
            category: 'music',
            channel: 'guild',
            typing: true,
            ratelimit: 2
        });
    };

    async exec(message) {

        if (this.client.Queue && !this.client.Queue.playing) {
            this.client.Queue.playing = true;
            await this.client.Queue.connection.dispatcher.resume();
            return message.util.send(`*Resumed music for you!*`);
        }
        return message.util.send(`*There is nothing playing!*`);
    };
};
module.exports = ResumeCommand;