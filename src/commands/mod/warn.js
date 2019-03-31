const { Command } = require('discord-akairo');
const Base = require('../../util/Base');
const Case = require('../../models/Case');
const moment = require('moment');

class WarnCommand extends Command {
	constructor() {
		super('warn', {
			aliases: ['warn'],
			category: 'mod',
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: `What member do you want to warn?`,
						retry: `Please mention a valid member.`
					}
				},
				{
					id: 'reason',
					match: 'rest',
					type: 'string',
					default: ''
				}
			],
			description: {
				content: 'Warns a user, duh.',
				usage: '<member> <...reason>',
				examples: ['@Suvajit dumb', '444432489818357760 nsfw']
			}
		});
	}

	userPermissions(message) {
		const staffRole = this.client.settings.get(message.guild, 'modRole', undefined);
		const hasStaffRole = message.member.roles.has(staffRole);
		if (!hasStaffRole) return 'Moderator';
		return null;
	}

	async exec(message, { member, reason }) {
		const staffRole = this.client.settings.get(message.guild, 'modRole', undefined);
		if (member.id === message.author.id) return;
		if (member.roles.has(staffRole)) {
			return message.reply('uh-uh! You know you can\'t do this.');
		}

		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;
		this.client.settings.set(message.guild, 'caseTotal', totalCases);

		if (!reason) {
			const prefix = this.handler.prefix(message);
			reason = `Use \`${prefix}reason ${totalCases} <...reason>\` to set a reason for this case`;
		}

		const modLogChannel = this.client.settings.get(message.guild, 'modLogChannel', undefined);
		let modMessage;
		if (modLogChannel) {
			const embed = Base.logEmbed({ message, member, action: 'Warn', caseNum: totalCases, reason }).setColor(Base.CONSTANTS.COLORS.WARN);
			modMessage = await (this.client.channels.get(modLogChannel)).send(embed);
		}

		await Case.create({
			caseID: totalCases,
			targetID: member.id,
			targetTag: member.user.tag,
			authorTag: message.author.tag,
			authorID: message.author.id,
			guildID: message.guild.id,
			messageID: modMessage ? modMessage.id : undefined,
			warn: 1,
			action: Base.CONSTANTS.ACTIONS.WARN,
			reason: reason,
			createdAt: moment.utc().toDate()
		});

		return message.util.send(`Successfully warned **${member.user.tag}**`);
	}
}

module.exports = WarnCommand;