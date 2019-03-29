const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment'); require('moment-duration-format');

class PlaylistInfoCommand extends Command {
	constructor() {
		super('playlist-info', {
			category: 'music',
			description: {
				content: 'Displays information about a playlist.',
				usage: '<playlist>'
			},
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					id: 'playlist',
					match: 'content',
					type: 'playlist',
					prompt: {
						start: `what playlist do you want information on?`,
						retry: (msg, args, { phrase }) => `a playlist with the name **${phrase}** does not exist.`
					}
				}
			]
		});
	}

	async exec(message, { playlist }) {
		const user = await this.client.users.fetch(playlist.userID);
		const guild = this.client.guilds.get(playlist.guildID);
		const embed = new MessageEmbed()
			.setColor(3447003)
			.setAuthor(user? user.tag : message.guild.name, user ? user.displayAvatarURL() : message.guild.iconURL())
			.setTitle(playlist.name)
			.addField('Description', playlist.description ? playlist.description.substring(0, 1020) : 'No description')
			.addField('Guild', guild ? `${guild.name}` : "Couldn't Fetch Guild")
			.addField('Songs', playlist.songs.length || 'No songs')
			.addField('Plays', playlist.plays)
			.addField('Created at', moment.utc(playlist.createdAt).format('DD-MM-YYYY kk:mm:ss'))
			.addField('Modified at', moment.utc(playlist.updatedAt).format('DD-MM-YYYY kk:mm:ss'));
		return message.util.send(embed);
	}
}

module.exports = PlaylistInfoCommand;