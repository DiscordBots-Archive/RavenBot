const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class AddTagCommand extends Command {
    constructor() {
        super('tag-info', {
           //aliases: ['tag-info'],
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
                   id: 'name',
                   type: 'lowercase',
                   match: 'content',
                   prompt: {
                       start: message => `*${message.author}, what tag do you want to see?*`,
                   }
               },
           ]
        });
    }

    async exec(message, { name }) {

        const data = await this.client.Tags.findOne({where: { tag_name: name, guild: message.guild.id } });
        if (data) {
            const embed = new MessageEmbed().setColor('0x824aee')
			.addField('❯ Name', data.get('tag_name'))
			.addField('❯ User', data.get('username') + ' (' + data.get('user') + ')')
			.addField('❯ Uses', data.get('usage_count'))
			.addField('❯ Created at', moment(data.createdAt).format('DD-MM-YY kk:mm:ss'))
            .addField('❯ Modified at', moment(data.updatedAt).format('DD-MM-YY kk:mm:ss'));
            return message.util.send(embed);
        }
        return;

    }
}

module.exports = AddTagCommand;