const { Command } = require('discord-akairo');
const Tags = require('../../models/Tags');

class TagStatsCommand extends Command {
    constructor() {
        super('tag-stats', {
            aliases: ['tag-stats'],
            category: 'tag',
            channel: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ],
            description: {
                content: 'Displays tag statistics of a member.',
                usage: '<member>',
                examples: ['@Suvajit']
            }
        })
    }

    async exec(message, { member }) {

        if (member) {
            const tags = await Tags.findAll({ where: { authorID: member.user.id, guildID: message.guild.id }});
            const totaluses = tags.reduce((count, c) => {
                return count + c.uses;
            }, 0);
            
            const embed = this.client.util.embed().setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .addField(`Owned Tags`, tags.length).addField(`Owned Tag Uses`, totaluses)
            .setFooter(message.guild.name, message.guild.iconURL()).setColor(0x8387db)
            return message.util.send({ embed });
        }
        const tags = await Tags.findAll({ where: { guildID: message.guild.id }});
        const totaluses = tags.reduce((count, c) => {
			return count + c.uses;
        }, 0);
        
        const embed = this.client.util.embed().setAuthor(`${message.guild.name}`, message.guild.iconURL())
        .addField(`Total Tags`, tags.length).addField(`Total Uses`, totaluses).setColor(0x8387db)
        return message.util.send({ embed });
    }
}

module.exports = TagStatsCommand;