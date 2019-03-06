const { Command } = require('discord-akairo');
const Util = require('../../util/Util');
const Case = require('../../models/Case');
const moment = require('moment');

class UnbanCommand extends Command {
	constructor() {
		super('unban', {
			aliases: ['unban'],
			category: 'mod',
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			ratelimit: 2,
			args: [
				{
					id: 'user',
					type: async id => {
						const user = await this.client.users.fetch(id);
						return user;
					},
					prompt: {
						start: message => `what member do you want to unban?`,
						retry: message => `please mention a member...`
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
				content: 'Unbans a user, duh.',
				usage: '<member> <...reason>',
				examples: ['@Suvajit', '444432489818357760']
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

	async exec(message, { user, reason }) {
		if (user.id === message.author.id) return;

		const key = `${message.guild.id}:${user.id}:UNBAN`;
		if (this.client.cached.has(key)) {
			return message.reply('that user is currently being moderated by someone else.');
		}
		this.client.cached.add(key);

		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;

		try {
			await message.guild.members.unban(user, `Unbanned by ${message.author.tag} | Case #${totalCases}`);
		} catch (error) {
			this.client.cached.delete(key);
			return message.reply(`there was an error unbanning this user: \`${error}\``);
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
			const embed = Util.logEmbed({ message, member: user, action: 'Unban', caseNum: totalCases, reason }).setColor(Util.CONSTANTS.COLORS.UNBAN);
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
			action: Util.CONSTANTS.ACTIONS.UNBAN,
			reason: reason,
			createdAt: moment.utc().toDate()
		});

		return message.util.send(`Successfully unbanned **${user.tag}**`);
	}
}

module.exports = UnbanCommand;