const { Command } = require('discord-akairo');
const moment = require('moment');

class ChannelInfoCommand extends Command {
    constructor() {
        super('channelinfo', {
            aliases: ['channel', 'channel-info'],
            category: 'info',
            clientPermissions: ['EMBED_LINKS', 'MANAGE_CHANNELS'],
            channel: 'guild',
            args: [
                {
                    id: 'channel',
                    type: 'channel',
                    default: message => message.channel
                }
            ],
            description: {
                content: 'Get info about a channel.',
                usage: '<channel>',
                examples: ['#general', 'bot-commands', '544374591305285632']
            }
        })
    }

    async exec(message, { channel }) {

        const embed = this.client.util.embed().setColor('RED')
        .setAuthor(`#${channel.name} (${channel.id})`)
        .setThumbnail(message.guild.iconURL())
        .addField('❯ Info', [
            `${channel.topic ? `• Topic: ${channel.topic}` : ''}`,
            `• Type: ${channel.type.toUpperCase()}`,
            `• NSFW: ${channel.nsfw ? 'Yes' : 'No'}`,
            `• Creation Date: ${moment(channel.createdAt).format('D-MM-YY, k:mm:ss')}`
        ])

        if (message.channel.type === 'dm' || !(message.channel).permissionsFor(message.guild.me).has(['ADD_REACTIONS', 'MANAGE_MESSAGES'], false)) {
			return message.util.send({ embed });
		}
		const msg = await message.util.send({ embed });
		msg.react('🗑');
		let react;
		try {
			react = await msg.awaitReactions(
				(reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id,
				{ max: 1, time: 30000, errors: ['time'] }
			);
		} catch (error) {
			msg.reactions.removeAll();

			return message;
		}
		react.first().message.delete();

		return message;
    }
}

module.exports = ChannelInfoCommand;