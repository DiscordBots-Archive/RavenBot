const { Command } = require('discord-akairo');

class AddTagCommand extends Command {
    constructor() {
        super('tag-show', {
            //aliases: ['tag-show'],
            category: 'tags',
            description: {
                content: 'It displays the tag content',
                usage: '<tag name>',
                examples: ['discord.js', 'purple', 'akairo']
            },
            channel: 'guild',
            ratelimit: 2,
            args: [
                {
                    id: 'name',
                    match: 'content',
                    type: 'lowercase',
                    prompt: {
                        start: message => `${message.author}, what tag do you want to see?`
                    }
                }
            ]
        });
    }

    async exec(message, { name }) {

        const data = await this.client.Tags.findOne({where: { tag_name: name, guild: message.guild.id } });
        if (data) {
            data.increment('usage_count');
            return message.util.send(data.get('tag_content'));
        }
        return;

    }
}

module.exports = AddTagCommand;