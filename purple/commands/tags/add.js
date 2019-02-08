const { Command } = require('discord-akairo');
const moment = require('moment');

class AddTagCommand extends Command {
    constructor() {
        super('tag-add', {
            //aliases: ['add', 'addtag'],
            category: 'tag',
            description: {
                content: 'Adds a tag, usable for everyone on the server',
                usage: '<tag name> <...content>',
                examples: ['discord.js is a powerful node module']
            },
            channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            ratelimit: 2,
            args: [
                {
                    id: 'name',
                    content: 'match',
                    type: 'lowercase',
                    prompt: {
                        start: message => `${message.author}, what tag do you want to add?`
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

    async exec(message, { name, content}) {

        const tag_ = name.toLowerCase();

        if (tag_ && tag_.length >= 1900) return message.util.reply('*messages have a limit of 2000 characters..*');
        if (content && content.length >= 1900) return message.util.reply('*messages have a limit of 2000 characters..*');

        const uniqueid =  moment(new Date()).format('YYYYMMDDhhmmssSSS');
        const data = await this.client.Tags.findOne({ where: { tag_name: tag_, guild: message.guild.id } });
        if (data) {
            if (data.get('tag_name') === tag_) return message.util.send(`${message.author}, a tag with the name **${tag_}** already exists.`)
        }

        try {
            const data_ = await this.client.Tags.create({
                name: uniqueid,
                guild: message.guild.id,
                user: message.author.id,
                username: message.author.tag,
                tag_name: tag_,
                tag_content: content,
            });
            return message.util.send(`A tag with the name **${data_.tag_name}** has been added!`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.util.reply('that tag already exists');
            }
            return message.util.reply('*something went wrong with adding a tag...*');
        }

    }
}

module.exports = AddTagCommand;