const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class ChannelCommand extends Command {
    constructor() {
        super('channel', {
           aliases: ['channel', 'channel-info'],
           description: {
               content: 'Get info about a channel',
               usage: '[channel]',
               examples: ['#general', 'general', '524674468698783746']
           },
           category: 'info',
           channel: 'guild',
           ratelimit: 2,
           typing: true,
           clientPermissions: ['MANAGE_CHANNELS', 'EMBED_LINKS'],
           args: [
               {
                   id: 'channel',
                   match: 'content',
                   type: 'channel',
                   default: message => message.channel
               }
           ]
        });
    }

    exec(message, args) {

        const channel = args.channel;

        const NSFW = {
            true : 'Yes',
            false : 'No'
        }

        const embed = new MessageEmbed()

        .setAuthor(`#${channel.name} | ${channel.id}`).setColor('RANDOM')
        .addField('❯ Info',`• Type: ${channel.type.toUpperCase()}` + `\n` +
        `• Topic ${channel.topic ? channel.topic : 'None'}` + `\n` +
        `• NSFW: ${NSFW[channel.nsfw]}` + `\n` +
        `• Creation Date: ${moment(channel.createdAt).format('D-MM-YY, k:mm:ss')}`)
        .setThumbnail(message.guild.iconURL());

        return message.util.send(embed);
    }
}

module.exports = ChannelCommand;