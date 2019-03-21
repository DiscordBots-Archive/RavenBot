const { Listener } = require('discord-akairo');
const ReactionRole = require('../../models/ReactionRoles');

class ReactionRoleListener extends Listener {
	constructor() {
		super('reactionRole', {
			event: 'raw',
			emitter: 'client',
			category: 'client'
		});
	}

	async exec(packet) {

		if (!packet.t || !packet.t.startsWith('MESSAGE_REACTION')) return;

		const channel = this.client.channels.get(packet.d.channel_id);
		if (channel.messages.has(packet.d.message_id)) return;

		let message;
		try {
			message = await channel.messages.fetch(packet.d.message_id);
		} catch (err) {
			return;
		}

		if (packet.t === 'MESSAGE_REACTION_REMOVE_ALL') {
			this.client.emit('messageReactionRemoveAll', message);
			return;
		}

		if (packet.d.emoji.name === '⭐') return;

		const data = await ReactionRole.findOne({ where: { emoji: packet.d.emoji.name, channelID: packet.d.channel_id, messageID: packet.d.message_id, guildID: packet.d.guild_id }});
		if (data && packet.d.emoji.name !== data.emoji) return;

		const user = await this.client.users.fetch(packet.d.user_id);

		if (data && packet.t === 'MESSAGE_REACTION_ADD') {
			this.client.emit('messageReactionAdd', message.reactions.get(data.emoji), user);
		} else if (data && packet.t === 'MESSAGE_REACTION_REMOVE') {
			this.client.emit('messageReactionRemove', {
				message,
				emoji: packet.d.emoji
			}, user);
		}
	}
}

module.exports = ReactionRoleListener;
