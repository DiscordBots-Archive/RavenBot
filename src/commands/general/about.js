const { Command } = require('discord-akairo');

class AboutCommand extends Command {
	constructor() {
		super('about', {
			aliases: ['about', 'info'],
			category: 'general',
			clientPermissions: ['EMBED_LINKS'],
			description: { content: 'Shows information about the bot.' }
		});
	}

	exec(message) {
		const prefix = this.handler.prefix(message);
		const owner = this.client.users.get(this.client.ownerID);

		const embed = this.client.util.embed()
			.setColor(0xFFAC33)
			.setTitle(`About ${this.client.user.username}`)
			.setDescription([
				`${this.client.user.username} is developed by [${owner.tag}](https://github.com/isuvajit)`,
				'',
				`${this.client.user.username} uses the **[Discord.js](https://discord.js.org)** library and the **[Akairo](https://1computer1.github.io/discord-akairo)** framework.`,
				'',
				`Use \`${prefix}stats\` for statistics and \`${prefix}invite\` for an invite link.`
			]);

		return message.util.send({ embed });
	}
}

module.exports = AboutCommand;
