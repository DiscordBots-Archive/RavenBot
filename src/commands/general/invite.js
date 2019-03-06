const { Command } = require('discord-akairo');

class InviteCommand extends Command {
	constructor() {
		super('invite', {
			aliases: ['invite'],
			category: 'general',
			clientPermissions: ['EMBED_LINKS'],
			description: { content: 'Gets the bot invite link.' }
		});
	}

	async fetchInvite() {
		if (this.invite) return this.invite;
		const invite = await this.client.generateInvite([
			'VIEW_CHANNEL',
			'MANAGE_MESSAGES',
			'READ_MESSAGE_HISTORY',
			'SEND_MESSAGES',
			'EMBED_LINKS'
		]);

		this.invite = invite;
		return invite;
	}

	async exec(message) {
		const embed = this.client.util.embed()
			.setColor(0xFFAC33)
			.setTitle(`**Invite ${this.client.user.username} to your server!**`).setURL(`${await this.fetchInvite()}`);

		return message.util.send({ embed });
	}
}

module.exports = InviteCommand;
