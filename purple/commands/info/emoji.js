const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const EMOJI_REGEX = /<:\w+:(\d{17,19})>/;

class EmojiCommand extends Command {
    constructor() {
        super('emoji', {
           aliases: ['emoji'],
           description: {
               content: 'Get information about an emoji',
               usage: '<emoji>',
               examples: ['🤔', 'thinking_face', '264701195573133315', '<:Thonk:264701195573133315>'],
           },
           category: 'info',
           channel: 'guild',
           ratelimit: 2,
           clientPermissions: ['EMBED_LINKS'],
           args: [
               {
                   id: 'emoji',
                   match: 'content',
                   type: (content, message) => {
                       if (EMOJI_REGEX.test(content)) [, content] = content.match(EMOJI_REGEX);
                       if (!isNaN(content)) return message.guild.emojis.get(content)
                       return message.guild.emojis.find(e=> e.name == content)
                   },
                   prompt: {
                       start: message => `${message.author}, what emoji would you like information about?`,
                       retry: message => `${message.author}, please provide a valid emoji!`
                   }
               }
           ]
        });
    }

    exec(message, args) {

        const emoji = args.emoji;
        const embed = new MessageEmbed().setColor(0x824aee)

        if (emoji) {
			embed.setDescription(`${emoji.name} (${emoji.id})`);
			embed.setThumbnail(emoji.url);
			embed.addField('❯ Info',`• Identifier: \`<${emoji.identifier}>\`\n` +
				`• Creation Date: ${moment.utc(emoji.createdAt).format('YYYY/MM/DD hh:mm:ss')}\n` +
				`• URL: ${emoji.url}`);
		} return message.util.send(embed);
    }
}

module.exports = EmojiCommand;