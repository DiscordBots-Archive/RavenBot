const { Command } = require('discord-akairo');
const Util = require('../../util/index.js');

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

    async exec(message, { member }) {
        
        const embed = Util.historyEmbed({message, member, client: this.client }).setColor(Util.CONSTANTS.COLORS.KICK);
        await message.channel.send(embed);
    }
}

module.exports = HistoryCommand;