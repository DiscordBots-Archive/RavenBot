const { Command } = require('discord-akairo');

class AddTagCommand extends Command {
    constructor() {
        super('show-tag', {
           aliases: ['tag'],
           category: 'tag',
           description: {
               content: 'It displays the tag content',
               usage: '<tag name>',
               examples: ['purple', 'rules']
           },
           channel: 'guild',
           ratelimit: 2,
           args: [
               {
                   id: 'tag',
                   type: 'tag',
                   match: 'rest',
                   prompt: {
                       start: message => `${message.author}, what tag do you want to see?`,
                   }
               },
           ]
        });
    }

    async exec(message, args) {

        const tag = args.tag;

        const value = await this.client.Tags.findOne({where: { tag_name: tag, guild: message.guild.id } });
        if (value) {
            value.increment('usage_count');
            return message.util.send(value.get('tag_content'))
        }
        return;

    }
}

module.exports = AddTagCommand;