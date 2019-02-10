const { Command } = require('discord-akairo');

class SetModLogCommand extends Command {
    constructor() {
        super('set-modlog', {
           aliases: ['set-modlog'],
           description: {
               content: 'Sets the mod log many of the commands use to log moderation actions',
               usage: '<channel>',
               examples: ['#mod-log', 'mod-log', '5465454654985659']
           },
           category: 'config',
           channel: 'guild',
           userPermissions: ['MANAGE_GUILD'],
           ratelimit: 2,
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

        this.client.settings.set(message.guild.id, 'modLogChannel', channel.id);
        return message.util.reply(`*set moderation log channel to ${channel}*`);
        
    }
}

module.exports = SetModLogCommand;