const { Command } = require('discord-akairo');
const Util = require('../../util/index.js');


class UnbanCommand extends Command {
	constructor() {
		super('unban', {
			aliases: ['unban'],
			category: 'mod',
			description: {
				content: 'Unbans a user, duh.',
				usage: '<member> <...reason>',
				examples: ['@Crawl']
			},
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
						start: message => `${message.author}, what member do you want to unban?`,
						retry: message => `${message.author}, please mention a member.`
					}
				},
				{
					id: 'reason',
					match: 'rest',
					type: 'string',
					default: 'Not Provided'
				}
			]
		});
	}

	async exec(message, { user, reason }) {

        if (user.id === message.author.id) return;
        
        const staffRole = this.client.settings.get(message.guild.id, 'modRole', []);
		if (!message.member.roles.some(role => staffRole.includes(role.id))) return;

		const totalCases = this.client.settings.get(message.guild.id, 'caseTotal', 0) + 1;

		try {
			await message.guild.members.unban(user, `Unbanned by ${message.author.tag} | Case #${totalCases}`);
		} catch (error) {
			return message.reply(`there was an error unbanning this user: \`${error}\``);
		}

		this.client.settings.set(message.guild.id, 'caseTotal', totalCases);
		const modLogChannel = this.client.settings.get(message.guild.id, 'modLogChannel', undefined);
		let modMessage;
		if (modLogChannel) {
			const embed = Util.logEmbed({ message, client: this.client, member: user, action: 'Unban', caseNum: totalCases, reason }).setColor(Util.CONSTANTS.COLORS.UNBAN);
			modMessage = await (this.client.channels.get(modLogChannel)).send(embed);
		}

		return message.util.send(`Successfully unbanned **${user.tag}**`);
	}
}
module.exports = UnbanCommand;