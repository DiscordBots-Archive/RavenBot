const { Command } = require('discord-akairo');
const Util = require('../../util/index.js');

class WarnCommand extends Command {
    constructor() {
        super('warn', {
            aliases: ['warn'],
            category: 'mod',
            description: {
                content: 'Warns a member, bruh!',
                usage: '<member> <...reason>',
                examples: ['@Purple', 'Purple']
            },
            channel: 'guild',
            clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS'],
            ratelimit: 2,
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: message => `${message.author}, what member do you want to warn?`,
                        retry: message => `${message.author}, please mention a valid member..`
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

    userPermissions(message) {
        const staffRole = this.client.settings.get(message.guild.id, 'modRole', []);
        if (!message.member.roles.some(role => staffRole.includes(role.id))) {
            return 'Moderator';
        }
        return null; 
    }

    async exec(message, { member, reason }) {

        const embed = Util.historyEmbed({message, member, client: this.client}).setColor(Util.CONSTANTS.COLORS.WARN)
		await message.channel.send('*You sure you want me to warn this member?*', { embed });
		const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {
			max: 1,
			time: 10000
		});

		if (!responses || responses.size !== 1) {
			return message.reply('*timed out_ cancelled warn...*');
		}
		const response = responses.first();

		let sentMessage;
		if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {
			sentMessage = await message.channel.send(`*Warning ${member.user.tag}...*`);
		} else {
			return message.reply('*cancelled warn...*');
		}

        const modcount = message.guild.id + member.user.id;
        const totalCases = this.client.settings.get(message.guild.id, 'caseTotal', 0) + 1;
        const warncount = this.client.settings.get(modcount, 'Warn', 0) + 1;

        this.client.settings.set(message.guild.id, 'caseTotal', totalCases);
        this.client.settings.set(modcount, 'Warn', warncount)
        
        const modLogChannel = this.client.settings.get(message.guild.id, 'modLogChannel', undefined);
		let modMessage;
		if (modLogChannel) {
			const embed = Util.logEmbed({message, client: this.client, member, caseNum: totalCases, action: 'Warn', reason}).setColor(Util.CONSTANTS.COLORS.MUTE);
			modMessage = await (this.client.channels.get(modLogChannel)).send(embed);
        }
        
        return sentMessage.edit(`*Successfully warned ${member.user.tag}*`);
    }
}

module.exports = WarnCommand;