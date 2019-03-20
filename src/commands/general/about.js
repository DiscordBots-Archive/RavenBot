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
				`**Dev**`,
				`**${this.client.user.username}** is developed by [${owner.tag}](https://github.com/isuvajit)`,
				`**Core**`,
				`[Discord.js](https://discord.js.org) (${Discord.version}) library and [Akairo](https://1computer1.github.io/discord-akairo) (${Akairo.version.replace(/beta.1/g, 'dev')}) framework`,
				`**Music**`,
				`[Lavalink](https://github.com/lavalibs/lavalink.js) Audio player, along with [Lavaqueue](https://github.com/lavalibs/lavaqueue)`,
				`**Database**`,
				`[PostgreSQL](https://www.postgresql.org/) database, along with [Sequelize](http://docs.sequelizejs.com/)`,
				`**Host**`,
				`[Amazon EC2](https://aws.amazon.com/ec2/)`,
				'```js',
				`${raven.toString()}`,
				'```'
			]);

		return message.util.send({ embed });
	}
}

module.exports = AboutCommand;
