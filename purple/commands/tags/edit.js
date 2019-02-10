const { Command } = require('discord-akairo');

class EditTagCommand extends Command {
    constructor() {
        super('tag-edit', {
            //aliases: ['edit-tag', 'edit'],
            category: 'tags',
            description: {
                content: 'Edit a tag',
                usage: '<tag name> <...content>',
                examples: ['Test Some new content']
            },
            channel: 'guild',
            ratelimit: 2,
            args: [
                {
                    id: 'name',
                    content: 'match',
                    type: 'lowercase',
                    prompt: {
                        start: message => `${message.author}, what tag do you want to edit?`
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

    async exec(message, { name, content}) {

        if (content && content.length >= 1900) return message.util.reply('*messages have a limit of 2000 characters..*');
        const data = await this.client.Tags.findOne({ where: { tag_name: name, guild: message.guild.id } });
        if (data) {
            
            if (data.get('user') !== message.author.id) return message.util.reply('*you can only edit your own tags!*');

            const affectedRows = await this.client.Tags.update({ tag_content: content }, { where: { name: data.get('name') } });
            if (affectedRows > 0) {
                return message.util.send(`*A tag with the name **${data.tag_name}** has been edited!*`);
            }
        }
        return message.util.send(`*No result found with name **${name}**...*`);

    }
}

module.exports = EditTagCommand;