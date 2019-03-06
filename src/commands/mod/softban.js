const { Command } = require('discord-akairo');
const Util = require('../../util/Util');
const Case = require('../../models/Case');
const moment = require('moment');

class SoftbanCommand extends Command {
	constructor() {
		super('softban', {
			aliases: ['softban'],
			category: 'mod',
			channel: 'guild',
			clientPermissions: ['MANAGE_ROLES'],
			ratelimit: 2,
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: message => `what member do you want to softban?`,
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
				content: 'Softbans a member, duh.',
				usage: '<member> <...reason>',
				examples: ['@Suvajit userbot', '444432489818357760 spam']
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

	async exec(message, { member, reason }) {
		const staffRole = this.client.settings.get(message.guild, 'modRole', undefined);
		if (member.id === message.author.id) return;
		if (member.roles.has(staffRole)) {
			return message.reply('nuh-uh! You know you can\'t do this.');
		}

		const keys = [`${message.guild.id}:${member.id}:BAN`, `${message.guild.id}:${member.id}:UNBAN`];
		if (this.client.cached.has(keys[0]) && this.client.cached.has(keys[1])) {
			return message.reply('that user is currently being moderated by someone else.');
		}
		this.client.cached.add(keys[0]);
		this.client.cached.add(keys[1]);

		const totalCases = this.client.settings.get(message.guild, 'caseTotal', 0) + 1;

		let sentMessage;
		try {
			sentMessage = await message.channel.send(`Softbanning **${member.user.tag}**...`);
			try {
				await member.send([
					`**You have been softbanned from ${message.guild.name}**`,
					`${reason ? `\n**Reason:** ${reason}\n` : ''}`,
					`A softban is a kick that uses ban + unban to remove your messages from the server.`,
					`You may rejoin whenever.`
				]);
			} catch {} // tslint:disable-line
			await member.ban({ days: 1, reason: `Softbanned by ${message.author.tag} | Case #${totalCases}` });
			await message.guild.members.unban(member, `Softbanned by ${message.author.tag} | Case #${totalCases}`);
		} catch (error) {
			this.client.cached.delete(keys[0]);
			this.client.cached.delete(keys[1]);
			return message.reply(`there was an error softbanning this member: \`${error}\``);
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
			const embed = Util.logEmbed({ message, member, action: 'Softban', caseNum: totalCases, reason }).setColor(Util.CONSTANTS.COLORS.SOFTBAN);
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
			action: Util.CONSTANTS.ACTIONS.SOFTBAN,
			reason: reason,
			createdAt: moment.utc().toDate()
		});

		return sentMessage.edit(`Successfully softbanned **${member.user.tag}**`);
	}
}

module.exports = SoftbanCommand;