const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class AllTagsCommand extends Command {
    constructor() {
        super('tag-list', {
            aliases: ['tags'],
            category: 'tags',
            description: {
                content: 'Get all of your server tags',
                usage: '[member]',
                examples: ['@Purple']
            },
            channel: 'guild',
            ratelimit: 2,
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ]
        });
    };

    async exec(message, { member }) {

        if (member) {
            const tagList = await this.client.Tags.findAll( { where: { guild: message.guild.id, user: member.user.id } }, { attributes: ['tag_name'] },);
            const tagString = tagList.map(t => `\`${t.tag_name}\``).join(', ') || '\u200b';
    
            const embed = new MessageEmbed().setAuthor(`Tags of ${member.user.tag}`, message.guild.iconURL()).setColor(16776960)
            .setDescription(`${tagString}`);
    
            return message.util.send(embed);
        };
        const tagList = await this.client.Tags.findAll( { where: { guild: message.guild.id } }, { attributes: ['tag_name'] },);
        const tagString = tagList.map(t => `\`${t.tag_name}\``).join(', ') || '\u200b';

        const embed = new MessageEmbed().setAuthor(`Tags`, message.guild.iconURL()).setColor(16776960)
        .setDescription(`${tagString}`);

        return message.util.send(embed);
    };
};
module.exports = AllTagsCommand;