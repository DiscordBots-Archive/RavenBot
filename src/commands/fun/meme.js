const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

class MemeCommand extends Command {
	constructor() {
		super('meme', {
			aliases: ['meme', 'memes', 'jokes'],
			category: 'fun',
			description: {
				content: 'Receives random Memes.'
			}
		});
	}

	async exec(message) {
		const page = Math.floor(Math.random() * 100) + 1;
		const image = Math.floor(Math.random() * 100) + 1;
		try {
			const res = await fetch(`https://api.imgur.com/3/gallery/r/memes/all/${page}`, { method: 'GET', headers: { Authorization: `Client-ID ${process.env.IMGUR}` } });
			const data = await res.json();
			const embed = new MessageEmbed().setColor(0X8387DB)
				.setTitle(data.data[image].title.toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase()))
				.setURL(data.data[image].link)
				.setImage(data.data[image].link);
			return message.channel.send({ embed });
        } catch {} // eslint-disable-line
	}
}

module.exports = MemeCommand;
