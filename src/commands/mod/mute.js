const { Command } = require('discord-akairo');
const Util = require('../../util/Util');
const Case = require('../../models/Case');
const moment = require('moment');
const ms = require('ms'); // tslint:disable-line

class MuteCommand extends Command {
	constructor() {
		super('mute', {
			aliases: ['mute'],
			category: 'mod',
			description: {
				content: 'Mutes a member, duh.',
				usage: '<member> <duration> <...reason>',
				examples: ['@Crawl']
			},
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: message => `what member do you want to mute?`,
						retry: message => `please mention a member.`
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
						start: message => `for how long do you want the mute to last?`,
						retry: message => `please use a proper time format.`
					}
				},
				{
					id: 'reason',
					match: 'rest',
					type: 'string',
					default: ''
				}
			]
		});
	}

	// @ts-ignore
	userPermissions(message) {
		const staffRole = this.client.settings.get(message.guild, 'modRole', undefined);
		const hasStaffRole = message.member.roles.has(staffRole);
		if (!hasStaffRole) return 'Moderator';
		return null;
	}

	async exec(message, { member, duration, reason }) {
		const staffRole = this.client.settings.get(message.guild, 'modRole', undefined);
		if (member.id === message.author.id) return;
		if (member.roles.has(staffRole)) {
			return message.reply('nuh-uh! You know you can\'t do this.');
		}

		const muteRole = this.client.settings.get(message.guild, 'muteRole', undefined);
		if (!muteRole) return message.reply('there is no mute role configured on this server.');

		const key = `${message.guild.id}:${member.id}:MUTE`;
		if (this.client.cached.has(key)) {
			return message.reply('that user is currently being moderated by someone else.');
		}
		this.client.cached.add(key);

		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;

		try {
			await member.roles.add(muteRole, `Muted by ${message.author.tag} | Case #${totalCases}`);
		} catch (error) {
			this.client.cached.delete(key);
			return message.reply(`there was an error muting this member: \`${error}\``);
		}

		this.client.settings.set(message.guild, 'caseTotal', totalCases);

		if (!reason) {
			// @ts-ignore
			const prefix = this.handler.prefix(message);
			reason = `Use \`${prefix}reason ${totalCases} <...reason>\` to set a reason for this case`;
		}

		const modLogChannel = this.client.settings.get(message.guild, 'modLogChannel', undefined);
		let modMessage;
		if (modLogChannel) {
			const embed = Util.logEmbed({ message, member, action: 'Mute', duration, caseNum: totalCases, reason }).setColor(Util.CONSTANTS.COLORS.MUTE);
			modMessage = await (this.client.channels.get(modLogChannel)).send(embed);
		}

		await this.client.muteScheduler.addMute({
			messageID: modMessage ? modMessage.id : null,
			caseID: totalCases,
			targetID: member.id,
			targetTag: member.user.tag,
			authorID: message.author.id,
			guildID: message.guild.id,
			authorTag: message.author.tag,
			action: Util.CONSTANTS.ACTIONS.MUTE,
			action_duration: new Date(Date.now() + duration),
			action_processed: false,
			reason: reason
		})

		return message.util.send(`Successfully muted **${member.user.tag}**`);
	}
}

module.exports = MuteCommand;