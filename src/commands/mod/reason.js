const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const Case = require('../../models/Case');
const moment = require('moment');

class ReasonCommand extends Command {
	constructor() {
		super('reason', {
			aliases: ['reason'],
			category: 'mod',
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			ratelimit: 2,
			args: [
				{
					id: 'caseNum',
					type: Argument.union('number', 'string'),
					prompt: {
						start: message => `what case do you want to add a reason to?`,
						retry: message => `please enter a case number...`
					}
				},
				{
					id: 'reason',
					match: 'rest',
					type: 'string'
				}
			],
			description: {
				content: 'Sets/Updates the reason of a modlog entry.',
				usage: '<case> <...reason>',
				examples: ['1234 dumb', 'latest dumb']
			}
		});
	}

	userPermissions(message) {
		const staffRole = this.client.settings.get(message.guild, 'modRole', undefined);
		const hasStaffRole = message.member.roles.has(staffRole);
		if (!hasStaffRole) return 'Moderator';
		return null;
	}

	async exec(message, { caseNum, reason }) {
		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0);
		const caseToFind = caseNum === 'latest' || caseNum === 'l' ? totalCases : caseNum;
		if (isNaN(caseToFind)) return message.reply('at least provide me with a correct number.');

		const cases = await Case.findOne({ where: { caseID: caseToFind, guildID: message.guild.id }});
		if (!cases) {
			return message.reply('I looked where I could, but I couldn\'t find a case with that Id, maybe look for something that actually exists!');
		}
		if (cases.authorID && (cases.authorID !== message.author.id && !message.member.permissions.has('MANAGE_GUILD'))) {
			return message.reply('you\'d be wrong in thinking I would let you fiddle with other peoples achievements!');
		}

		const modLogChannel = this.client.settings.get(message.guild, 'modLogChannel', undefined);
		if (modLogChannel) {
			const caseEmbed = await (this.client.channels.get(modLogChannel)).messages.fetch(cases.messageID);
			if (!caseEmbed) return message.reply('looks like the message doesn\'t exist anymore!');
			const embed = new MessageEmbed(caseEmbed.embeds[0]);
			embed.setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
				.setDescription(caseEmbed.embeds[0].description.replace(/\*\*Reason:\*\* [\s\S]+/, `**Reason:** ${reason}`));
			await caseEmbed.edit(embed);
		}

		if (cases) {
			await Case.update({
				authorID: message.author.id,
				authorTag: message.author.tag,
				reason: reason,
				updatedAt: moment.utc().toDate()
			}, { where : { caseID: caseToFind, guildID: message.guild.id }});
		}

		return message.util.send(`Successfully set reason for case **#${caseToFind}**`);
	}
}

module.exports = ReasonCommand;