const { Command } = require('discord-akairo');

class PauseCommand extends Command {
    constructor() {
        super('pause', {
            aliases: ['pause'],
            description: {
                content: 'Pauses the currently playing track.',
            },
            category: 'music',
            channel: 'guild',
            typing: true,
            ratelimit: 2
        });
    };

    async exec(message) {

        if (this.client.Queue && this.client.Queue.playing) {
            this.client.Queue.playing = false;
            await this.client.Queue.connection.dispatcher.pause();
            return message.util.send(`*Paused music for you!*`);
        }
        return message.util.send(`*There is nothing playing!*`);
    };
};
module.exports = PauseCommand;