const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const Base = require('../../util/Base');
const Case = require('../../models/Case');
const ms = require('ms');

class DurationCommand extends Command {
	constructor() {
		super('duration', {
			aliases: ['duration'],
			category: 'mod',
			description: {
				content: 'Sets the duration for a mute and reschedules it.',
				usage: '<case> <duration>',
				examples: ['1234 30m', 'latest 20h']
			},
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			ratelimit: 2,
			args: [
				{
					id: 'caseNum',
					type: Argument.union('number', 'string'),
					prompt: {
						start: `what case do you want to add a reason to?`,
						retry: `please enter a case number.`
					}
				},
				{
					id: 'duration',
					type: str => {
						if (!str) return null;
						const duration = ms(str);
						if (duration && duration >= 300000 && !isNaN(duration)) return duration;
						return null;
					},
					prompt: {
						start: `for how long do you want the mute to last?`,
						retry: `please use a proper time format.`
					}
				}
			]
		});
	}

	userPermissions(message) {
		const staffRole = this.client.settings.get(message.guild, 'modRole', undefined);
		const hasStaffRole = message.member.roles.has(staffRole);
		if (!hasStaffRole) return 'Moderator';
		return null;
	}

	async exec(message, { caseNum, duration }) {
		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0);
		const caseToFind = caseNum === 'latest' || caseNum === 'l' ? totalCases : caseNum;
		if (isNaN(caseToFind)) return message.reply('at least provide me with a correct number.');
		const dbCase = await Case.findOne({ where: { caseID: caseToFind, guildID: message.guild.id, action: Base.CONSTANTS.ACTIONS.MUTE, action_processed: false }});
		if (!dbCase) {
			return message.reply('I couldn\'t find a case with that Id!');
		}
		if (dbCase.mod_id !== message.author.id && !message.member.permissions.has('MANAGE_GUILD')) {
			return message.reply('you\'d be wrong in thinking I would let you fiddle with other peoples achievements!');
		}

		const modLogChannel = this.client.settings.get(message.guild, 'modLogChannel', undefined);
		if (modLogChannel) {
			const caseEmbed = await (this.client.channels.get(modLogChannel)).messages.fetch(dbCase.messageID);
			if (!caseEmbed) return message.reply('looks like the message doesn\'t exist anymore!');
			const embed = new MessageEmbed(caseEmbed.embeds[0]);
			if (dbCase.action_duration) {
				embed.setDescription(caseEmbed.embeds[0].description.replace(/\*\*Length:\*\* (.+)*/, `**Length:** ${ms(duration, { long: true })}`));
			} else {
				embed.setDescription(caseEmbed.embeds[0].description.replace(/(\*\*Action:\*\* Mute)/, `$1\n**Length:** ${ms(duration, { long: true })}`));
			}
			await caseEmbed.edit(embed);
		}
		
		await Case.update({
			action_duration: new Date(Date.now() + duration),
			createdAt: new Date(Date.now())
		}, { where: { caseID: caseToFind, guildID: message.guild.id }});

		await this.client.muteScheduler.rescheduleMute({
			messageID: dbCase.messageID,
			caseID: caseToFind,
			targetID: dbCase.targetID,
			targetTag: dbCase.targetTag,
			authorID: dbCase.authorID,
			guildID: dbCase.guildID,
			authorTag: dbCase.authorTag,
			action: Base.CONSTANTS.ACTIONS.MUTE,
			action_duration: new Date(Date.now() + duration),
			action_processed: dbCase.action_processed,
			reason: dbCase.reason
		});

		return message.util.send(`Successfully updated duration for case **#${caseToFind}**`);
	}
}

module.exports = DurationCommand;