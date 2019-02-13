const { Command } = require('discord-akairo');

class StopCommand extends Command {
    constructor() {
        super('stop', {
            aliases: ['stop', 'leave'],
            description: {
                content: 'Disconnect the bot from the voice channel it is in and clear all queue.',
            },
            category: 'music',
            channel: 'guild',
            typing: true,
            ratelimit: 2
        });
    };

    async exec(message) {
        //await this.client.channels.get(message.guild.me.voice.channel.id).leave();
        //return message.util.send('*Disconnected!*');
        if (!message.member.voice.channel) return message.util.send(`*You are not in a voice channel!*`);
        if (!this.client.Queue) return message.util.send(`*There is nothing playing that I could skip for you!*`);
        this.client.Queue.songs = [];
        await this.client.Queue.connection.dispatcher.end(`Stop command has been used by ${message.author.tag}`);
    };
};
module.exports = StopCommand;