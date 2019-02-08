const { Command } = require('discord-akairo');

class DeleteTagCommand extends Command {
    constructor() {
        super('tag-delete', {
            //aliases: ['delete', 'delete-tag', 'del-tag'],
            category: 'tag',
            description: {
                content: 'Add a tag bruh',
                usage: '<tag name> <...content>',
                examples: ['discord.js', 'purple', 'akairo']
            },
            channel: 'guild',
            ratelimit: 2,
            args: [
                {
                    id: 'name',
                    
                    type: 'lowercase',
                    match: 'content',
                    prompt: {
                        start: message => `${message.author}, what tag do you want to delete?`
                    }
                }
            ]
        });
    }

    async exec(message, { name }) {

        const data = await this.client.Tags.findOne({ where: { tag_name: name, guild: message.guild.id } });
        if (data) {
            if (data.get('user') !== message.author.id) return message.util.reply('you can only delete your own tags!');

            await this.client.Tags.destroy({ where: { name: data.get('name') } })

            return message.util.send(`Successfully deleted **${name}**...`)
        }
        return message.util.send(`No result found with name **${name}**...`)

    }
}

module.exports = DeleteTagCommand;