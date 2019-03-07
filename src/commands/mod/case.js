const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const Util = require('../../util/Util');
const Case = require('../../models/Case');
const ms = require('ms');

const ACTIONS = {
	1: 'Ban',
	2: 'Unban',
	3: 'Softban',
	4: 'Kick',
	5: 'Mute',
	6: 'Embed Restriction',
	7: 'Emoji Restriction',
	8: 'Reaction Restriction',
	9: 'Warn'
};

class CaseCommand extends Command {
	constructor() {
		super('case', {
			aliases: ['case'],
			category: 'mod',
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					id: 'caseNum',
					type: Argument.union('number', 'string'),
					prompt: {
						start: message => `what case do you want to look up?`,
						retry: message => `please enter a case number.`
					}
				}
			],
			description: {
				content: 'Inspect a case, pulled from the database.',
				usage: '<case>',
				examples: ['1234']
			}
		});
	}

	// @ts-ignore
	userPermissions(message) {
		const staffRole = this.client.settings.get(message.guild, 'modRole', undefined);
		const hasStaffRole = message.member.roles.has(staffRole);
		if (!hasStaffRole) return 'Moderator';
		return null;
	}

	async exec(message, { caseNum }) {
		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0);
		const caseToFind = caseNum === 'latest' || caseNum === 'l' ? totalCases : caseNum;
		if (isNaN(caseToFind)) return message.reply('at least provide me with a correct number.');
		const db = await Case.findOne({ where: { caseID: caseToFind, guildID: message.guild.id }});
		if (!db) {
			return message.reply('I looked where I could, but I couldn\'t find a case with that Id, maybe look for something that actually exists!');
		}

		const moderator = await message.guild.members.fetch(db.authorID);
		const color = Object.keys(Util.CONSTANTS.ACTIONS).find(key => Util.CONSTANTS.ACTIONS[key] === db.action).split(' ')[0].toUpperCase();
		const embed = new MessageEmbed()
			if (db.authorID !== null) embed.setAuthor(`${db.authorTag} (${db.authorID})`, moderator ? moderator.user.displayAvatarURL() : '')
			embed.setColor(Util.CONSTANTS.COLORS[color])
			embed.setDescription([
				`**Member:** ${db.targetTag} (${db.targetID})`,
				`**Action:** ${ACTIONS[db.action]}${db.action === 5 ? `\n**Length:** ${db.action_duration ? ms((db.action_duration - db.createdAt), { long: true }) : 'Not Set'}` : ''}`,
				`**Reason:** ${db.reason}${db.ref_id ? `\n**Ref case:** ${db.ref_id}` : ''}`
			])
			embed.setFooter(`Case ${db.caseID}`)
			embed.setTimestamp(new Date(db.createdAt));

		return message.util.send(embed);
	}
}

module.exports = CaseCommand;