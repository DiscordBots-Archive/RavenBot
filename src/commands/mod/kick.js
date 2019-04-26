const { Command } = require('discord-akairo');
const Base = require('../../util/Base');
const Case = require('../../models/Case');
const moment = require('moment');

class KickCommand extends Command {
	constructor() {
		super('kick', {
			aliases: ['kick'],
			category: 'mod',
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: 'what member do you want to kick?',
						retry: 'please mention a member...'
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
				content: 'Kicks a member, duh.',
				usage: '<member> <...reason>',
				examples: ['@Suvajit userbot', '444432489818357760 nsfw']
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

		let sentMessage;
		try {
			sentMessage = await message.channel.send(`Kicking **${member.user.tag}**...`);
			await member.kick(`Kicked by ${message.author.tag} | Case #${totalCases}`);
			try {
				await member.send([
					`**You have been kicked from ${message.guild.name}**`,
					`${reason ? `\n**Reason:** ${reason}\n` : ''}`,
					'You may rejoin whenever.'
				]);
			} catch {} // eslint:disable-line
		} catch (error) {
			return message.reply('I could not kick this user.');
		}

		this.client.settings.set(message.guild, 'caseTotal', totalCases);

		if (!reason) {
			const prefix = this.handler.prefix(message);
			reason = `Use \`${prefix}reason ${totalCases} <...reason>\` to set a reason for this case`;
		}

		const modLogChannel = this.client.settings.get(message.guild, 'modLogChannel', undefined);
		let modMessage;
		if (modLogChannel) {
			const embed = Base.logEmbed({ message, member, action: 'Kick', caseNum: totalCases, reason }).setColor(Base.CONSTANTS.COLORS.KICK);
			modMessage = await this.client.channels.get(modLogChannel).send(embed);
		}

		await Case.create({
			caseID: totalCases,
			targetID: member.id,
			targetTag: member.user.tag,
			authorTag: message.author.tag,
			authorID: message.author.id,
			guildID: message.guild.id,
			messageID: modMessage ? modMessage.id : undefined,
			action: Base.CONSTANTS.ACTIONS.KICK,
			reason,
			createdAt: moment.utc().toDate()
		});

		return sentMessage.edit(`Successfully kicked **${member.user.tag}**`);
	}
}

module.exports = KickCommand;
