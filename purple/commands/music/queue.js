const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class QueueCommand extends Command {
    constructor() {
        super('queue', {
            aliases: ['queue'],
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

        if (!this.client.Queue) return message.util.send(`*There is nothin playing!*`);

        const embed = new MessageEmbed().setAuthor(`Queue for ${message.guild.name}`, message.guild.iconURL()).setColor('RED')
        .setThumbnail(message.guild.iconURL())
        const songs = this.client.Queue.songs;
        let count; count=0;
        let list;
        for (const song of songs.values()) {
            if (song) {count++};
            embed.addField(`*\u200b**${count}.** ${song.title}*`, '\u200b');
        }
        return message.util.send(embed);
    };
};
module.exports = QueueCommand;