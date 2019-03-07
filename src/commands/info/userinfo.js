const { Command } = require('discord-akairo');
const moment = require('moment');

class UserCommand extends Command {
    constructor() {
        super('user', {
            aliases: ['user'],
            category: 'info',
            channel: 'guild',
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: message => message.member
                }
            ],
            description: {
                content: 'Get info about a member.',
                usage: '<member>',
                examples: ['@Suvajit', 'Suvajit', '444432489818357760']
            }
        })
    }

    async exec(message, { member }) {

        const {user} = member;

        const embed = this.client.util.embed().setColor('RED')
        .setAuthor(`${member.user.tag} (${member.user.id})`, user.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .addField('❯ Member Details', [
            `${member.nickname ? `• Nickname: ${member.nickname}` : ''}`,
            `• Joined at: ${moment.utc(member.joinedAt).format('DD/MM/YYYY kk:mm:ss')}`,
            `• Role: ${member.roles.map(role=> `*${role}*`).join(', ')}`
        ])
        .addField('❯ User Details', [
            `${user.bot ? `• Bot Account` : ''}`,
            `• ID: ${user.id}`,
            `• Created at: ${moment.utc(user.createdAt).format('DD/MM/YYYY kk:mm:ss')}`,
            `• Status: ${user.presence.status.toUpperCase()}`,
            `• Activity: ${user.presence.activity ? user.presence.activity.name : 'None'}`
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

module.exports = UserCommand;