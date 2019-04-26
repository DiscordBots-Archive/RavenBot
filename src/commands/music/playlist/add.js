const { Argument, Command } = require('discord-akairo');
const Playlist = require('../../../models/Playlist');
const url = require('url');
const path = require('path');
const { parse } = require('url');

class PlaylistAddCommand extends Command {
	constructor() {
		super('playlist-add', {
			description: {
				content: 'Adds a song to the playlist.',
				usage: '<playlist> <link/playlist>',
				examples: []
			},
			category: 'music',
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'playlist',
					type: 'playlist',
					prompt: {
						start: 'what playlist should this song/playlist be added to?',
						retry: (msg, args, { phrase }) => `a playlist with the name **${phrase}** does not exist.`
					}
				},
				{
					id: 'query',
					match: 'rest',
					type: Argument.compose('string', str => str ? str.replace(/<(.+)>/g, '$1') : ''), // eslint-disable-line no-confusing-arrow
					default: ''
				}
			]
		});
	}

	async exec(message, { playlist, query }) {
		if (playlist.userID !== message.author.id) return message.util.reply('you can only add songs to your own playlists.');
		if (!query && message.attachments.first()) {
			query = message.attachments.first().url;
			if (!['.mp3', '.ogg', '.flac', '.m4a'].includes(path.parse(url.parse(query).path).ext)) return;
		} else if (!query) {
			return;
		}
		if (!['http:', 'https:'].includes(url.parse(query).protocol)) query = `ytsearch:${query}`;
		// TODO: remove hack
		const res = await this.client.music.load(query);

		let msg;
		if (['TRACK_LOADED', 'SEARCH_RESULT'].includes(res.loadType)) {
			const newTracks = await playlist.songs.concat([res.tracks[0].track]);
			await playlist.update({ songs: newTracks });
			msg = res.tracks[0].info.title;
		} else if (res.loadType === 'PLAYLIST_LOADED') {
			const newTracks = await playlist.songs.concat(res.tracks.map(track => track.track));
			await playlist.update({ songs: newTracks });
			msg = res.playlistInfo.name;
		} else {
			return message.util.send('I couldn\'t find what you were looking for.');
		}

		return message.util.send(`**Added to playlist:** \`${msg}\``);
	}
}

module.exports = PlaylistAddCommand;
