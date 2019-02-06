const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class AddTagCommand extends Command {
    constructor() {
        super('tag-info', {
           aliases: ['tag-info'],
           category: 'tag',
           description: {
               content: 'Get all info of tag',
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
            const embed = new MessageEmbed().setColor('0x824aee')
			.addField('❯ Name', value.get('tag_name'))
			.addField('❯ User', value.get('username') + ' | ' + value.get('user'))
			.addField('❯ Uses', value.get('usage_count'))
			.addField('❯ Created at', moment(value.createdAt).format('DD-MM-YY kk:mm:ss'))
            .addField('❯ Modified at', moment(value.updatedAt).format('DD-MM-YY kk:mm:ss'));
            return message.util.send(embed);
        }
        return;

    }
}

module.exports = AddTagCommand;