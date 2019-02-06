const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class SayCommand extends Command {
    constructor() {
        super('say', {
           aliases: ['say'],
           category: 'util',
           description: {
               content: 'Say Command',
               usage: '<...text>',
               examples: ['i want sex'],
           },
           ratelimit: 2,
           clientPermissions: ['MANAGE_MESSAGES'],
           args: [
               {
                   id: 'reason',
                   match: 'rest',
                   type: 'string',
                   default: 'Hey send some message'
               }
           ]
        });
    }

    exec(message, args) {

        const countChannel = this.client.settings.get(this.client.user.id, 'countChannel', undefined);
        if (countChannel) {
            let channel = this.client.channels.get(countChannel);
            if (message.channel.id === channel.id) {
                return;
            }
        }

        const sayMessage = args.reason;
        message.delete().catch(O_o=>{}); 
        return message.util.send(sayMessage);
    }
}

module.exports = SayCommand;