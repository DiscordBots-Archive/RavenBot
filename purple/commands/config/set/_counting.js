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
        
        channel.messages.fetch(channel.lastMessageID).then(async msg => {console.log(msg.author.tag);
            this.client.settings.set(message.guild.id, 'countChannel', channel.id);
            this.client.settings.set(channel.id, 'authorID', msg.author.id);
            this.client.settings.set(channel.id, 'messageContent', msg.content);
            return message.util.reply(`*set count channel to ${channel} and last input is ${msg.content}*`);
        }).catch(error => {console.log(error)});
        
        
    }
}

module.exports = CountingCommand;