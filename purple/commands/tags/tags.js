const { Command } = require('discord-akairo');

class AllTagsCommand extends Command {
    constructor() {
        super('tags', {
           aliases: ['tags'],
           category: 'tag',
           description: {
               content: 'Get all of your server tags',
           },
           channel: 'guild',
           ratelimit: 2,
        });
    }

    async exec(message, args) {

        const tagList = await this.client.Tags.findAll( { where: { guild: message.guild.id } }, { attributes: ['tag_name'] },);
        const tagString = tagList.map(t => t.tag_name).join(', ') || 'No tags set';
        return message.util.send(tagString)
    }
}

module.exports = AllTagsCommand;