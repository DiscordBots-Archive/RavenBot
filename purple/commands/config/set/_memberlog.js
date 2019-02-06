const { Command } = require('discord-akairo');

class SetMemberLogCommand extends Command {
    constructor() {
        super('set-memberlog', {
           description: {
               content: 'Sets the member log to capture member joins & leaves',
               usage: '<channel>',
               examples: ['#member-log', 'member-log', '5465454654985659']
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
                       start: message => `*${message.author}, what channel you want to set?*`,
                       retry: message => `*${message.author}, please provide a valid channel...*`
                   }
               }
           ]
        });
    }

    async exec(message, { channel }) {

        this.client.settings.set(message.guild.id, 'memberLog', channel.id);
		return message.util.reply(`set member log channel to **${channel.name}**`);
    }
}

module.exports = SetMemberLogCommand;