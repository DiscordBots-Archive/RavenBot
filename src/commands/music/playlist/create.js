const { Command } = require('discord-akairo');
const Playlist = require('../../../models/Playlist');
const { Util } = require('discord.js');

class PlaylistCreateCommand extends Command {
	constructor() {
		super('playlist-create', {
			category: 'music',
			description: {
				content: 'Creates a playlist.',
				usage: '<playlist> [info]'
			},
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'playlist',
					type: 'existingPlaylist',
					prompt: {
						start: 'what playlist do you want to create?',
						retry: (msg, { phrase }) => `a playlist with the name **${phrase}** already exists.`
					}
				},
				{
					id: 'info',
					match: 'rest',
					type: 'string'
				}
			]
		});
	}

	async exec(message, { playlist, info }) {
		const pls = await Playlist.create({
			userID: message.author.id,
			guildID: message.guild.id,
			name: playlist,
			description: info ? Util.cleanContent(info, message) : ''
		});

		return message.util.reply(`successfully created **${pls.name}**.`);
	}
}

module.exports = PlaylistCreateCommand;
