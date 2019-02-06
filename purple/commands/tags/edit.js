const { Command } = require('discord-akairo');
const moment = require('moment');

class EditTagCommand extends Command {
    constructor() {
        super('edit-tag', {
           aliases: ['edit-tag', 'edit'],
           category: 'tag',
           description: {
               content: 'Edit a tag',
               usage: '<tag name> <...content>',
               examples: ['purple A discord bot']
           },
           channel: 'guild',
           ratelimit: 2,
           args: [
               {
                   id: 'tag',
                   type: 'tag',
                   content: 'match',
                   prompt: {
                       start: message => `${message.author}, what tag do you want to edit?`,
                   }
               },
               {
                   id: 'content',
                   match: 'rest',
                   type: 'content',
                   default: '',
                   prompt: {
                       start: message => `${message.author}, what is the new content of your tag?`
                   }
               }
           ]
        });
    }

    async exec(message, args) {

        const tag = args.tag;
        const content = args.content;

        const value = await this.client.Tags.findOne({ where: { tag_name: tag, guild: message.guild.id } });
        if (value) {
            if (value.get('user') !== message.author.id) return message.util.reply('you can only edit your own tags!');
        }

        const affectedRows = await this.client.Tags.update({ tag_content: content }, { where: { name: value.get('name') } });
        if (affectedRows > 0) {
            return message.util.send(`Now leave it to me, a tag with the name **${value.tag_name}** has been edited!`);
        }
        return message.util.send(`No result found with name **${tag}**...`);

    }
}

module.exports = EditTagCommand;