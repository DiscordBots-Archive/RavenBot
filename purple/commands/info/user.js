const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class UserCommand extends Command {
    constructor() {
        super('user', {
           aliases: ['user', 'member', 'user-info'],
           description: {
               content: 'Get info about a member',
               usage: '[member]',
               examples: ['@Purple', '444432489818357760'],
           },
           category: 'info',
           channel: 'guild',
           ratelimit: 2,
           typing: true,
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
        const { user } = member;
        const embed = new MessageEmbed()

        .setTitle(member.user.tag + ' | ' + member.user.id)
        .setURL(member.user.avatarURL())
        .setColor('#f6ff5c')

        .addField('❯ Member Details',`${member.nickname == undefined ? '• No nickname' : ` • Nickname: ${member.nickname}`}` + '\n' +
        `• Roles: ${member.roles.map(roles => `\`${roles.name}\``).join(' ')}` + '\n' +
        `• Joined at: ${moment.utc(member.joinedAt).format('DD-MM-YY kk:mm:ss')}`)

        .addField('❯ User Details',`• ID: ${member.id}` + '\n' +
        `• Username: ${member.user.tag}` + '\n' +
        `• Created at: ${moment.utc(user.createdAt).format('DD-MM-YY kk:mm:ss')}${user.bot ? '\n• Is a bot account' : ''}` + '\n' +
        `• Status: ${user.presence.status.toUpperCase()}` + '\n' +
        `• Activity: ${user.presence.activity ? user.presence.activity.name : 'None'}`)
        .setThumbnail(user.displayAvatarURL());
        
        //return message.util.send(embed);
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

module.exports = UserCommand;