const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
           aliases: ['avatar'],
           description: {
               content: 'Get displayAvatar of a member',
               usage: '[member]',
               examples: ['@Purple', '499250383785558026']
           },
           category: 'info',
           channel: 'guild',
           ratelimit: 2,
           clientPermissions: ['EMBED_LINKS'],
           args: [
               {
                   id: 'member',
                   match: 'content',
                   type: 'member',
                   default: message => message.member
               }
           ]
        });
    }

    async exec(message, args) {
        const member = args.member;
        const embed = new MessageEmbed()
        .setTitle(member.user.tag)
        .setURL(member.user.avatarURL())
        .setImage(member.user.displayAvatarURL({ size: 2048 }))
        const msg = await message.util.send({ embed });
		msg.react('🗑');
		let react;
		try {
			react = await msg.awaitReactions(
				(reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id,
				{ max: 1, time: 10000, errors: ['time'] }
			);
		} catch (error) {
			msg.reactions.removeAll();

			return message;
		}
		react.first().message.delete();

		return message;
    }
}

module.exports = AvatarCommand;