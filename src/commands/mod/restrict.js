const { Command } = require('discord-akairo');

class RestrictCommand extends Command {
	constructor() {
		super('restrict', {
			aliases: ['restrict'],
			category: 'mod',
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			ratelimit: 2,
			args: [
				{
					id: 'restriction',
					type: ['embed', 'embeds', 'image', 'images', 'img', 'emoji', 'reaction', 'react']
				},
				{
					id: 'rest',
					match: 'rest',
					default: ''
				}
			],
			description: {
				content:[
					'Restrict a members ability to post embeds/use custom emojis/react.',
					'Available restrictions:',
					'• embed \`<member> <...reason>\`',
					'• emoji \`<member> <...reason>\`',
					'• reaction \`<member> <...reason>\`',

					'Required: \`<>\` | Optional: \`[]\`',

					'For additional \`<...arguments>\` usage refer to the examples below.'
				],
				usage: '<restriction> <...argumens>',
				examples: [
					'img @Suvajit nsfw',
					'embed @Supriyo img spam',
					'emoji @Nuke dumb',
					'reaction @Riday why though'
				]
			},
		});
	}

	// @ts-ignore
	userPermissions(message) {
		const staffRole = this.client.settings.get(message.guild, 'modRole', undefined);
		const hasStaffRole = message.member.roles.has(staffRole);
		if (!hasStaffRole) return 'Moderator';
		return null;
	}

	async exec(message, { restriction, rest }) {
		if (!restriction) {
			// @ts-ignore
			const prefix = this.handler.prefix(message);
			return message.util.send([
				`When you beg me so much I just can't not help you~`,
				`Check \`${prefix}help restrict\` for more information.`
			]);
		}
		const command = ({
			embed: this.handler.modules.get('restrict-embed'),
			embeds: this.handler.modules.get('restrict-embed'),
			image: this.handler.modules.get('restrict-embed'),
			images: this.handler.modules.get('restrict-embed'),
			img: this.handler.modules.get('restrict-embed'),
			emoji: this.handler.modules.get('restrict-emoji'),
			reaction: this.handler.modules.get('restrict-reaction'),
			react: this.handler.modules.get('restrict-reaction')
		})[restriction];

		return this.handler.handleDirectCommand(message, rest, command, true);
	}
}

module.exports = RestrictCommand;