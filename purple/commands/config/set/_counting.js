const { Command } = require('discord-akairo');

class CountingCommand extends Command {
    constructor() {
        super('set-counting', {
           description: {
               content: 'Sets the counting channel',
               usage: '<channel>',
               examples: ['#counting', 'count', '5465454654985659']
           },
           category: 'config',
           channel: 'guild',
           userPermissions: ['MANAGE_GUILD'],
           ratelimit: 2,
           ownerOnly: true,
           args: [
               {
                   id: 'channel',
                   match: 'content',
                   type: 'textChannel',
                   prompt: {
                       start: message => `${message.author}, what channel you want to set?`,
                       retry: message => `${message.author}, please provide a valid channel...`
                   }
               }
           ]
        });
    }

    async exec(message, { channel }) {

        this.client.settings.set(this.client.user.id, 'countChannel', channel.id);
        return message.util.reply(`set count channel to **${channel.name}**`);
        
    }
}

module.exports = CountingCommand;