const { Command } = require('discord-akairo');
const moment = require('moment');
const { MessageEmbed, GuildEmoji } = require('discord.js');
const emojis = require('node-emoji');
const punycode = require('punycode'); // eslint:disable-line

const EMOJI_REGEX = /<:\w+:(\d{17,19})>/;

class EmojiInfoCommand extends Command {
	constructor() {
		super('emoji', {
			aliases: ['emoji', 'emoji-info'],
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
						return message.guild.emojis.find(emoji => emoji.name === content);
					},
					prompt: {
						start: message => `what emoji would you like information about?`,
						retry: message => `please provide a valid emoji!`
					}
				}
			],
			description: {
				content: 'Get information about an emoji.',
				usage: '<emoji>',
				examples: ['🤔', 'thinking_face', '264701195573133315', '<:Thonk:264701195573133315>']
			}
		});
	}

	async exec(message, { emoji }) {
		const embed = new MessageEmbed()
			.setColor(3447003);

		if (emoji instanceof GuildEmoji) {
			embed.setDescription(`Info about ${emoji.name} (ID: ${emoji.id})`);
			embed.setThumbnail(emoji.url);
			embed.addField('❯ Info', [
				`• Identifier: \`<${emoji.animated ? '' : ':'}${emoji.identifier}>\``,
				`• Creation Date: ${moment.utc(emoji.createdAt).format('DD/MM/YYYY kk:mm:ss')}`,
				`• URL: ${emoji.url}`
			]);
		} else {
			embed.setDescription(`Info about ${emoji.emoji}`);
			embed.addField('❯ Info', [
				`• Name: \`${emoji.key}\``,
				`• Raw: \`${emoji.emoji}\``,
				`• Unicode: \`${punycode.ucs2.decode(emoji.emoji).map(e => `\\u${e.toString(16).toUpperCase().padStart(4, '0')}`).join('')}\``
			]);
		}

		return message.util.send(embed);
	}
}

module.exports = EmojiInfoCommand;