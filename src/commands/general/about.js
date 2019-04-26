const { Command } = require('discord-akairo');
const Akairo = require('discord-akairo');
const Discord = require('discord.js');

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
		const owner = this.client.users.get(this.client.ownerID);

		const embed = this.client.util.embed()
			.setColor(0x8387db)
			.setTitle(`About ${this.client.user.username}`)
			.addField('Dev', `**${this.client.user.username}** is developed by **[${owner.tag}](https://almostsuvajit.xyz)**`)
			.addField('Core', `[Discord.js](https://discord.js.org) (${Discord.version}) library and [Akairo](https://1computer1.github.io/discord-akairo) (${Akairo.version}) framework`)
			.addField('Music', '[Lavalink](https://github.com/lavalibs/lavalink.js) audio player, along with [Lavaqueue](https://github.com/lavalibs/lavaqueue), backed by [Redis](https://github.com/MicrosoftArchive/redis) instance')
			.addField('Database', '[PostgreSQL](https://www.postgresql.org/) database, along with [Sequelize](http://docs.sequelizejs.com/) [Node.js](https://nodejs.org/en/) ORM')
			.addField('Host', '[Amazon EC2](https://aws.amazon.com/ec2/)');
		return message.util.send({ embed });
	}
}

module.exports = AboutCommand;
