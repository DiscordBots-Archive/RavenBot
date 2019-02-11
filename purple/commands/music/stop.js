const { Command } = require('discord-akairo');

class StopCommand extends Command {
    constructor() {
        super('stop', {
            aliases: ['stop', 'leave'],
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
        await this.client.channels.get(message.guild.me.voice.channel.id).leave();
    };
};
module.exports = StopCommand;