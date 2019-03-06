const { Listener } = require('discord-akairo');
const Logger = require('../../util/Logger');
const Starboard = require('../../struct/Starboard');
const { ReferenceType } = require('rejects');

class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			event: 'ready',
			emitter: 'client',
			category: 'client'
		});
	}

	async exec() {

		Logger.info(`${this.client.user.tag} (${this.client.user.id})`, { tag: 'READY' });

		this.client.user.setActivity('⚠');

		await this.client.muteScheduler.init(); // calls muteScheduler

		for (const guild of this.client.guilds.values()) {
			const starboard = new Starboard(guild);
			this.client.starboards.set(guild.id, starboard);
		}

		const players = await this.client.storage.get('players', { type: ReferenceType.ARRAY });
		if (players) {
			for (const player of players) {
				if (player.channel_id) {
					const queue = this.client.music.queues.get(player.guild_id);
					await queue.player.join(player.channel_id);
				};
			};
			await this.client.music.queues.start();
		};
	}
}

module.exports = ReadyListener;
