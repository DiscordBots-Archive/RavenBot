const { Listener } = require('discord-akairo');
const { ReferenceType } = require('rejects');
const ReactionRole = require('../../models/ReactionRoles');

class RawListener extends Listener {
	constructor() {
		super('raw', {
			event: 'raw',
			emitter: 'client',
			category: 'client'
		});
	}

	async exec(packet) {

		switch (packet.t) {
			case 'VOICE_STATE_UPDATE':
				if (packet.d.user_id !== process.env.ID) return;
				this.client.music.voiceStateUpdate(packet.d);
				const players = await this.client.storage.get('players', { type: ReferenceType.ARRAY });
				let index = 0;
				if (Array.isArray(players)) index = players.findIndex(player => player.guild_id === packet.d.guild_id);
				if (((!players && !index) || index < 0) && packet.d.channel_id) {
					this.client.storage.upsert('players', [{ guild_id: packet.d.guild_id, channel_id: packet.d.channel_id }]);
				} else if (players && typeof index !== 'undefined' && index >= 0 && !packet.d.channel_id) {
					players.splice(index, 1);
					await this.client.storage.delete('players');
					if (players.length) await this.client.storage.set('players', players);
				}
				break;
			case 'VOICE_SERVER_UPDATE':
				this.client.music.voiceServerUpdate(packet.d);
				break;
			case 'MESSAGE_CREATE':
				this.client.prometheus.messagesCounter.inc();
				break;
			default: break;
		}

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

		// if (packet.d.emoji.name !== '⭐') return;
		const data = await ReactionRole.findAll({ where: { messageID: packet.d.message_id }});
		const emojis = data.map(str => str.emoji);
		if (!emojis.includes(packet.d.emoji.name)) return;
		const user = await this.client.users.fetch(packet.d.user_id);

		if (packet.t === 'MESSAGE_REACTION_ADD') {
			this.client.emit('messageReactionAdd', {
				message,
				emoji: packet.d.emoji
			}, user);
		} else if (packet.t === 'MESSAGE_REACTION_REMOVE') {
			this.client.emit('messageReactionRemove', {
				message,
				emoji: packet.d.emoji
			}, user);
		}
	}
}

module.exports = RawListener;
