const { Listener } = require('discord-akairo');
const ReactionRole = require('../../models/ReactionRoles');

class MessageReactionAddListener extends Listener {
	constructor() {
		super('messageReactionAdd', {
			event: 'messageReactionAdd',
			emitter: 'client',
			category: 'client'
		});
	}

	async exec(reaction, user) {
		if (user.id === this.client.user.id) return;
		if (!reaction.message.guild) return;

		if (reaction.emoji.name === '⭐') {
			const starboard = this.client.starboards.get(reaction.message.guild.id);
			const error = await starboard.add(reaction.message, user);

			if (error !== undefined) {
				if (reaction.message.channel.permissionsFor(this.client.user).has('MANAGE_MESSAGES')) {
					await reaction.users.remove(user).then(() => {
						starboard.reactionsRemoved.add(reaction.message.id);
					}).catch(() => null);
				}

				if (error.length && reaction.message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES')) {
					reaction.message.channel.send(`${user} **::** ${error}`);
				}
			}
		}

		const data = await ReactionRole.findOne({ where: { guildID: reaction.message.guild.id, emoji: reaction.emoji.name, messageID: reaction.message.id, channelID: reaction.message.channel.id }});
		
		if (data && reaction.emoji.name === data.emoji && reaction.message.guild.id === data.guildID && reaction.message.channel.id === data.channelID && reaction.message.id === data.messageID) {
			const member = await reaction.message.guild.members.fetch(user);
			try {
				await member.roles.add(data.roleID, 'Reaction Role Added');
			} catch (error) {
				if (error) console.log(error);
			}
		}
	}
}

module.exports = MessageReactionAddListener;
