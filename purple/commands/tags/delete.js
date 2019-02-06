const { Command } = require('discord-akairo');

class DeleteTagCommand extends Command {
    constructor() {
        super('delete-tag', {
           aliases: ['delete-tag', 'del-tag'],
           category: 'tag',
           description: {
               content: 'Add a tag bruh',
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
                       start: message => `${message.author}, what tag do you want to delete?`,
                       retry: message => `${message.author}, please provide a valid tag`
                   }
               },
           ]
        });
    }

    async exec(message, args) {

        const tag = args.tag;

        const value = await this.client.Tags.findOne({ where: { tag_name: tag, guild: message.guild.id } });
        if (value) {
            if (value.get('user') !== message.author.id) return message.util.reply('you can only delete your own tags!');

            await this.client.Tags.destroy({ where: { name: value.get('name') } })

            return message.util.send(`Successfully deleted **${tag}**...`)
        }
        return message.util.send(`No result found with name **${tag}**...`)

    }
}

module.exports = DeleteTagCommand;