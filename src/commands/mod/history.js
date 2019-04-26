const { Command } = require('discord-akairo');
const Base = require('../../util/Base');
const Case = require('../../models/Case');

class HistoryCommand extends Command {
	constructor() {
		super('history', {
			aliases: ['history'],
			category: 'mod',
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					match: 'content',
					type: 'member',
					default: message => message.member
				}
			],
			description: {
				content: 'Check the history of a member.',
				usage: '<member>',
				examples: ['@Suvajit']
			}
		});
	}

	async exec(message, { member }) {
		const staffRole = message.member.roles.has(this.client.settings.get(message.guild, 'modRole', undefined));
		if (!staffRole && message.author.id !== member.id) return message.reply('you know, I know, we should just leave it at that.');

		const cases = await Case.findAll({ where: { targetID: member.id, guildID: message.guild.id } });
		const embed = Base.historyEmbed({ member, cases });

		return message.util.send(embed);
	}
}

module.exports = HistoryCommand;
