const { Command } = require('discord-akairo');
const moment = require('moment');

class AddTagCommand extends Command {
    constructor() {
        super('addtag', {
           aliases: ['addtag', 'add'],
           category: 'tag',
           description: {
               content: 'Adds a tag, usable for everyone on the server',
               usage: '<tag name> <...content>',
               examples: ['purple Official Discord Bot of Air Hounds Family']
           },
           channel: 'guild',
           userPermissions: ['MANAGE_GUILD'],
           ratelimit: 2,
           args: [
               {
                   id: 'tag',
                   type: 'tag',
                   content: 'match',
                   prompt: {
                       start: message => `${message.author}, what tag do you want to add?`,
                   }
               },
               {
                   id: 'content',
                   match: 'rest',
                   type: 'content',
                   default: '',
                   prompt: {
                       start: message => `${message.author}, what is the content of your tag?`
                   }
               }
           ]
        });
    }

    async exec(message, args) {

        const tag = args.tag;
        const content = args.content;

        const uniqueid =  moment(new Date()).format('YYYYMMDDhhmmssSSS');

        const value = await this.client.Tags.findOne({ where: { tag_name: tag, guild: message.guild.id } });
        if (value) {
            if (value.get('tag_name') === tag) return message.util.send(`${message.author}, a tag with the name **${tag}** already exists.`)
        }

        try {
            const value = await this.client.Tags.create({
                name: uniqueid,
                guild: message.guild.id,
                user: message.author.id,
                username: message.author.tag,
                tag_name: tag,
                tag_content: content,
            });
            return message.util.send(`Now leave it to me, a tag with the name **${value.tag_name}** has been added!`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.util.reply('that tag already exists.');
            }
            return message.util.reply('something went wrong with adding a tag.');
        }

    }
}

module.exports = AddTagCommand;