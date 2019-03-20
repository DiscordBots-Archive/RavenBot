const { Command } = require('discord-akairo');
const Akairo = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');

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
		const raven = fs.readFileSync('file.txt', 'utf8');

		const embed = this.client.util.embed()
			.setColor('#8387db')
			.setTitle(`About ${this.client.user.username}`)
			.setDescription([
				`${this.client.user.username} is developed by [${owner.tag}](https://github.com/isuvajit)`,
				`${this.client.user.username} uses the **[Discord.js](https://discord.js.org) (${Discord.version})** library and the **[Akairo](https://1computer1.github.io/discord-akairo) (${Akairo.version})** framework.`,
				`Use \`${prefix}stats\` for statistics and \`${prefix}invite\` for an invite link.`,
				'```js',
				`${raven.toString()}`,
				'```'
			]);

		return message.util.send({ embed });
	}
}

module.exports = AboutCommand;
