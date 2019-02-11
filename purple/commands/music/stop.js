const { Command } = require('discord-akairo');

class StopCommand extends Command {
    constructor() {
        super('stop', {
           aliases: ['stop'],
           description: {
               content: 'Stops music and leave voice channel',
           },
           category: 'music',
           typing: true,
           ratelimit: 2,
        });
    }

    async exec(message) {
        await this.client.channels.get(message.member.voice.channel.id).leave();
    }
}

module.exports = StopCommand;