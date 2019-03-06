const { Listener } = require('discord-akairo');
const RoleState = require('../../models/Rolestate');
const Util = require('../../util/Util');
const Case = require('../../models/Case');
const moment = require('moment');

class GuildMemberUpdateModerationListener extends Listener {
	constructor() {
		super('guildMemberUpdateModeration', {
			emitter: 'client',
			event: 'guildMemberUpdate',
			category: 'client'
		});
	}

	async exec(oldMember, newMember) {
		const moderation = this.client.settings.get(newMember.guild, 'moderation', undefined);
		if (moderation) {
			if (this.client.cached.delete(`${newMember.guild.id}:${newMember.id}:MUTE`)) return;
			if (this.client.cached.delete(`${newMember.guild.id}:${newMember.id}:EMBED`)) return;
			if (this.client.cached.delete(`${newMember.guild.id}:${newMember.id}:EMOJI`)) return;
			if (this.client.cached.delete(`${newMember.guild.id}:${newMember.id}:REACTION`)) return;

			const modRole = this.client.settings.get(newMember.guild, 'modRole', undefined);
			if (modRole && newMember.roles.has(modRole)) return;
			const muteRole = this.client.settings.get(newMember.guild, 'muteRole', undefined);
			const restrictRoles = this.client.settings.get(newMember.guild, 'restrictRoles', undefined);
			if (!muteRole && !restrictRoles) return;
			const automaticRoleState = await RoleState.findOne({where: { userID: newMember.id, guildID: newMember.guild.id }});
			if (
				automaticRoleState &&
				(automaticRoleState.rolesID.includes(muteRole) ||
				automaticRoleState.rolesID.includes(restrictRoles.embed) ||
				automaticRoleState.rolesID.includes(restrictRoles.emoji) ||
				automaticRoleState.rolesID.includes(restrictRoles.reaction))
			) return;
			const modLogChannel = this.client.settings.get(newMember.guild, 'modLogChannel', undefined);
			const role = newMember.roles.filter(r => r.id !== newMember.guild.id && !oldMember.roles.has(r.id)).first();
			//const casesRepo = this.client.db.getRepository(Case);
			if (!role) {
				if (oldMember.roles.has(muteRole) && !newMember.roles.has(muteRole)) {
					const dbCase = await Case.findOne({ where: { targetID: newMember.id, guildID: newMember.guild.id, action_processed: false }});
					if (dbCase) this.client.muteScheduler.cancelMute(dbCase);
				}
				return;
			}

			let actionName;
			let action;
			let processed = true;
			switch (role.id) {
				case muteRole:
					actionName = 'Mute';
					action = Util.CONSTANTS.ACTIONS.MUTE;
					processed = false;
					break;
				case restrictRoles.embed:
					actionName = 'Embed Restriction';
					action = Util.CONSTANTS.ACTIONS.EMBED;
					break;
				case restrictRoles.emoji:
					actionName = 'Emoji Restriction';
					action = Util.CONSTANTS.ACTIONS.EMOJI;
					break;
				case restrictRoles.reaction:
					actionName = 'Reaction Restriction';
					action = Util.CONSTANTS.ACTIONS.REACTION;
					break;
				default: return;
			}

			const totalCases = this.client.settings.get(newMember.guild, 'caseTotal', 0) + 1;
			this.client.settings.set(newMember.guild, 'caseTotal', totalCases);

			const prefix = this.client.commandHandler.prefix({ guild: newMember.guild });
			const reason = `Use \`${prefix}reason ${totalCases} <...reason>\` to set a reason for this case`;

			let modMessage;
			if (modLogChannel) {
				// @ts-ignore
				const color = Object.keys(Util.CONSTANTS.ACTIONS).find(key => Util.CONSTANTS.ACTIONS[key] === action).split(' ')[0].toUpperCase();
				const embed = Util.logEmbed({ member: newMember, action: actionName, caseNum: totalCases, reason }).setColor(Util.CONSTANTS.COLORS[color]);
				modMessage = await (this.client.channels.get(modLogChannel)).send(embed);
			}
			await Case.create({
				caseID: totalCases,
				targetID: newMember.id,
				targetTag: newMember.user.tag,
				guildID: newMember.guild.id,
				action: action,
				reason: reason,
				action_processed: processed,
				createdAt: moment.utc().toDate(),
				messageID: modMessage ? modMessage.id : null
			})
		}
	}
}

module.exports = GuildMemberUpdateModerationListener;