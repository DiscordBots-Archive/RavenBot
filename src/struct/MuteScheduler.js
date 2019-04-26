const { Op } = require('sequelize');
const Case = require('../models/Case');
const Logger = require('../util/Logger');

class MuteScheduler {
	constructor(client, { checkRate = 5 * 60 * 1000 } = {}) {
		this.client = client;
		this.checkRate = checkRate;
		this.checkInterval;
		this.queuedSchedules = new Map();
	}

	async addMute(mute, reschedule = false) {
		Logger.info(`Muted ${mute.targetTag} on ${this.client.guilds.get(`${mute.guildID}`).name}`, { tag: 'MUTE' });
		if (reschedule) Logger.info(`Rescheduled mute on ${mute.targetID} on ${this.client.guilds.get(mute.guildID)}`, { tag: 'Rescheduled Mute' });
		if (!reschedule) {
			await Case.create({
				caseID: mute.caseID,
				targetID: mute.targetID,
				targetTag: mute.targetTag,
				authorID: mute.authorID,
				authorTag: mute.authorTag,
				messageID: mute.messageID,
				guildID: mute.guildID,
				action: mute.action,
				action_duration: mute.action_duration,
				action_processed: mute.action_processed,
				reason: mute.reason
			});
		}
		if (mute.action_duration < (Date.now() + this.checkRate)) {
			this.queueMute(mute);
		}
	}

	async cancelMute(mute) {
		Logger.info(`Unmuted ${mute.targetID} on ${this.client.guilds.get(mute.guildID)}`, { tag: 'UNMUTE' });
		const guild = await this.client.guilds.get(`${mute.guildID}`);
		const muteRole = await this.client.settings.get(guild, 'muteRole', undefined);
		let member;
		try {
			member = await guild.members.fetch(mute.targetID);
		} catch {} // eslint:disable-line
		await Case.update({
			action_processed: true
		}, { where: { guildID: guild.id, targetID: member.id } });
		if (member) {
			try {
				await member.roles.remove(muteRole, 'Unmuted automatically based on duration.');
			} catch {} // eslint:disable-line
		}
		const schedule = this.queuedSchedules.get(mute);
		if (schedule) clearTimeout(schedule);
		return this.queuedSchedules.delete(mute);
	}

	async deleteMute(mute) {
		const schedule = this.queuedSchedules.get(mute);
		if (schedule) clearTimeout(schedule);
		this.queuedSchedules.delete(mute);
		const deleted = await Case.destroy({ where: mute });
		return deleted;
	}

	queueMute(mute) {
		this.queuedSchedules.set(mute, setTimeout(() => {
			this.cancelMute(mute);
		}, mute.action_duration - Date.now()));
	}

	rescheduleMute(mute) {
		Logger.info('Rescheduling Mute', { tag: 'Rescheduling Mute' });
		const schedule = this.queuedSchedules.get(mute);
		if (schedule) clearTimeout(schedule);
		this.queuedSchedules.delete(mute);
		this.addMute(mute, true);
	}

	async init() {
		await this._check();
		this.checkInterval = setInterval(this._check.bind(this), this.checkRate);
	}

	async _check() {
		const mutes = await Case.findAll({
			where: { action_duration: { [Op.lt]: new Date(Date.now() + this.checkRate) }, action_processed: false, action: 5 }
		});
		const now = new Date();
		for (const mute of mutes) {
			if (this.queuedSchedules.has(mute)) continue;
			if (mute.action_duration < now) {
				this.cancelMute(mute);
			} else {
				this.queueMute(mute);
			}
		}
	}
}

module.exports = MuteScheduler;
