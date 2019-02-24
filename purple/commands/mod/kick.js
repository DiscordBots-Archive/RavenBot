const { Command } = require('discord-akairo');
const Util = require('../../util/index.js');

class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            category: 'mod',
            description: {
                content: 'Kicks a member, bruh!',
                usage: '<member> <...reason>',
                examples: ['@Purple', 'Purple posting ads']
            },
            channel: 'guild',
            ratelimit: 2,
            clientPermissions: ['KICK_MEMBERS', 'EMBED_LINKS'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: message => `${message.author}, what member do you want kick?`,
                        retry: message => `${message.author}, please mention a valid member...`
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

    async exec(message, args) {

        const member = args.member;
        const reason = args.reason;

        const embed = Util.historyEmbed({message, member, client: this.client}).setColor(Util.CONSTANTS.COLORS.KICK)
		await message.channel.send('*You sure you want me to kick this member?*', { embed });
		const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {
			max: 1,
			time: 10000
		});

		if (!responses || responses.size !== 1) {
			return message.reply('*timed out_ cancelled kick..*');
		}
		const response = responses.first();

		let sentMessage;
		if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {
			sentMessage = await message.channel.send(`*Kicking ${member.user.tag}...*`);
		} else {
			return message.reply('*cancelled kick...*');
		}

        const modcount = message.guild.id + member.user.id;
        const totalCases = this.client.settings.get(message.guild.id, 'caseTotal', 0) + 1;
        const kickcount = this.client.settings.get(modcount, 'Kick', 0) + 1;

		try {
			await member.kick(`Kicked by ${message.author.tag} | Case #${totalCases}`);
			try {
				await member.send(`*You have been kicked from ${message.guild.name}** \n${reason ? `*Reason: ${reason}\n` : ''}, you may rejoin whenever*`);
			} catch {} 
		} catch (error) {
			return sentMessage.edit(`*${message.author}, I could not kick ${member.user.tag}*`);
        }

        this.client.settings.set(message.guild.id, 'caseTotal', totalCases);
        this.client.settings.set(modcount, 'Kick', kickcount);
        
        const modLogChannel = this.client.settings.get(message.guild.id, 'modLogChannel', undefined);
		let modMessage;
		if (modLogChannel) {
			const embed = Util.logEmbed({message, client: this.client, member, caseNum: totalCases, action: 'Kick', reason}).setColor(Util.CONSTANTS.COLORS.KICK);
			modMessage = await (this.client.channels.get(modLogChannel)).send(embed);
        }
        
        return sentMessage.edit(`*Successfully kicked ${member.user.tag}*`);
    }
}

module.exports = KickCommand;