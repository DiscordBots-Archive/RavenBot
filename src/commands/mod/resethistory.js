const { Command } = require('discord-akairo');
const Case = require('../../models/Case');

class ResetHistoryCommand extends Command {
	constructor() {
		super('reset-history', {
			aliases: ['reset-history'],
			category: 'mod',
			ownerOnly: true,
			channel: 'guild',
			args: [
				{
					id: 'member',
					type: 'member'
				}
			],
			description: {
				content: 'Deletes all cases for the specified user.',
				usage: '<member>',
				examples: ['@Suvajit']
			}
		});
	}

	async exec(message, { member }) {
		if (!member) return;
		const data = await Case.update({ action: 0 }, { where: { targetID: member.user.id, guildID: message.guild.id } });
		if (data) {
			return message.channel.send(`Successfully reset cases for **${member.user.tag}**`);
		}
	}
}

module.exports = ResetHistoryCommand;
