const { Command, Argument } = require('discord-akairo');
const Logger = require('../../util/Logger');

class LaunchCybernukeCommand extends Command {
	constructor() {
		super('cybernuke', {
			aliases: ['cybernuke', 'launch-cybernuke'],
			category: 'mod',
			ownerOnly: true,
			clientPermissions: ['BAN_MEMBERS'],
			ratelimit: 2,
			args: [
				{
					id: 'join',
					type: Argument.range('number', 0.1, 120, true),
					prompt: {
						start: 'how old (in minutes) should a member be for the cybernuke to ignore them (server join date)?',
						retry: 'the minimum is `0.1` and the maximum `120` minutes.'
					}
				},
				{
					id: 'age',
					type: Argument.range('number', 0.1, Infinity, true),
					prompt: {
						start: 'how old (in minutes) should a member\'s account be for the cybernuke to ignore them (account age)?',
						retry: 'the minimum is `0.1` minutes.'
					}
				}
			],
			description: {
				content: 'Bans all members that have joined recently, with new accounts.',
				usage: '<join> <age>',
				examples: ['10 120']
			}
		});
	}

	async exec(message, { join, age }) {
		await message.util.send('Calculating targeting parameters for cybernuke...');
		await message.guild.members.fetch();

		const memberCutoff = Date.now() - (join * 60000);
		const ageCutoff = Date.now() - (age * 60000);
		const members = message.guild.members.filter(
			member => member.joinedTimestamp > memberCutoff && member.user.createdTimestamp > ageCutoff
		);

		await message.util.send(`Cybernuke will strike ${members.size} members; proceed?`);
		let statusMessage;

		const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {
			max: 1,
			time: 10000
		});

		if (!responses || responses.size !== 1) {
			await message.reply('Cybernuke cancelled.');
			return null;
		}
		const response = responses.first();

		if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {
			statusMessage = await response.reply('Launching cybernuke...');
		} else {
			await response.reply('Cybernuke cancelled.');
			return null;
		}

		const fatalities = [];
		const survivors = [];
		const promises = [];

		for (const member of members.values()) {
			promises.push(
				member.send([
					`Sorry, but you've been automatically targetted by the cybernuke in the "${message.guild.name}" server.`,
					'This means that you have been banned, likely in the case of a server raid.',
					'Please contact them if you believe this ban to be in error.'
				]).catch(error => Logger.error(`[CYBERNUKE ERROR] ${error.message}`, { tag: 'Cybernyke' }))
					.then(async () => member.ban())
					.then(() => {
						fatalities.push(member);
					})
					.catch(err => {
						Logger.error(`[CYBERNUKE ERROR] ${err.message}`, { tag: 'Cybernuke' });
						survivors.push({
							member,
							error: err
						});
					})
					.then(async () => {
						if (members.size <= 5) return;
						if (promises.length % 5 === 0) {
							await statusMessage.edit(`Launching cyber nuke (${Math.round(promises.length / members.size * 100)}%)...`);
						}
					})
			);
		}

		await Promise.all(promises);
		await statusMessage.edit('Cybernuke impact confirmed. Casuality report incoming...');
		await response.reply([
			'',
			'**Fatalities**',
			`${fatalities.length > 0 ? `${fatalities.length} confirmed. \n${fatalities.map(fat => `**-** ${fat.displayName} (${fat.id})`).join('\n')}` : 'None'}`,
			'',
			`${survivors.length > 0 ? `**Survivors** \n${survivors.length} left standing. \n${survivors.map(srv => `**-** ${srv.member.displayName} (${srv.member.id}): \`${srv.error}\``).join('\n')}` : ''}`
		], { split: true });

		return null;
	}
}

module.exports = LaunchCybernukeCommand;
