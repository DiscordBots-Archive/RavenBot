const { Command } = require('discord-akairo');

class HistoryCommand extends Command {
    constructor() {
        super('history', {
           aliases: ['history'],
           category: 'mod',
           description: {
               content: 'Check the history of a member',
               usage: '<member>',
               examples: ['@Purple']
           },
           channel: 'guild',
           ratelimit: 2,
           typing: true,
           clientPermissions: ['EMBED_LINKS'],
           args: [
               {
                   id: 'member',
                   type: 'member',
                   default: message => message.member
               },
           ]
        });
    }

    async exec(message, args) {

        const member = args.member;

        const embed = this.client.historyEmbed({message, member}).setColor(this.client.CONSTANTS.COLORS.KICK);
        await message.channel.send(embed);
    }
}

module.exports = HistoryCommand;