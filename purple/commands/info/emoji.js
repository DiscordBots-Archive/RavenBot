const { Command } = require('discord-akairo');
const { MessageEmbed, GuildEmoji } = require('discord.js');
const moment = require('moment');
const emojis = require('node-emoji');
const punycode = require('punycode');

const EMOJI_REGEX = /<:\w+:(\d{17,19})>/;

class EmojiInfoCommand extends Command {
	constructor() {
		super('emoji', {
			aliases: ['emoji', 'emoji-info'],
			description: {
				content: 'Get information about an emoji.',
				usage: '<emoji>',
				examples: ['🤔', 'thinking_face', '264701195573133315', '<:Thonk:264701195573133315>']
			},
			category: 'info',
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					id: 'emoji',
					match: 'content',
					type: (content, message) => {
						if (EMOJI_REGEX.test(content)) [, content] = content.match(EMOJI_REGEX);
						if (!isNaN(content)) return message.guild.emojis.get(content);
						else if (content) return message.guild.emojis.find(e => e.name == content);
						else return emojis.find(content);
					},
					prompt: {
						start: message => `${message.author}, what emoji would you like information about?`,
						retry: message => `${message.author}, please provide a valid emoji!`
					}
				}
			]
		});
	}

	async exec(message, { emoji }) {
		const embed = new MessageEmbed().setColor('#8387db');

		if (emoji instanceof GuildEmoji) {
			embed.setAuthor(`Emoji: ${emoji.name} (${emoji.id})`);
			embed.setThumbnail(emoji.url);
			embed.addField('❯ Info', `• Identifier: \`<${emoji.identifier}>\` \n• Creation Date: ${moment.utc(emoji.createdAt).format('DD-MM-YY kk:mm:ss')} \n• URL: ${emoji.url}`);
		} else {
			embed.setAuthor(`Emoji: ${emoji.emoji}`);
			embed.addField('❯ Info', `• Name: \`${emoji.key}\` \n• Raw: \`${emoji.emoji}\` \n• Unicode: \`${punycode.ucs2.decode(emoji.emoji).map(e => `\\u${e.toString(16).toUpperCase()}`).join('')}\``);
		}
		return message.util.send(embed);
	}
}
module.exports = EmojiInfoCommand;