const { Command } = require('discord-akairo');
const Util = require('../../util/index.js');

class SoftBanCommand extends Command {
    constructor() {
        super('softban', {
           aliases: ['softban'],
           category: 'mod',
           description: {
               content: 'Softbans a member, bruh.',
               usage: '<member> <...reason>',
               examples: ['@Purple']
           },
           channel: 'guild',
           clientPermissions: ['BAN_MEMBERS', 'EMBED_LINKS'],
           userPermissions: ['BAN_MEMBERS'],
           ratelimit: 2,
           args: [
               {
                   id: 'member',
                   type: 'member',
                   prompt: {
                       start: message => `${message.author}, what member do you want to softban?`,
                       retry: message => `${message.author}, please mention a member...`
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

    async exec(message, args) {

        const member = args.member;
        const reason = args.reason;

        const embed = this.client.historyEmbed({message, member}).setColor(this.client.CONSTANTS.COLORS.SOFTBAN)
		await message.channel.send('*You sure you want me to softban this member?*', { embed });
		const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {
			max: 1,
			time: 10000
		});

		if (!responses || responses.size !== 1) {
			return message.reply('*timed out_ cancelled softban..*');
		}
		const response = responses.first();

		let sentMessage;
		if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {
			sentMessage = await message.channel.send(`*Softbanning ${member.user.tag}...*`);
		} else {
			return message.reply('*cancelled softban...*');
		}

        const modcount = message.guild.id + member.user.id;
        const totalCases = this.client.settings.get(message.guild.id, 'caseTotal', 0) + 1;
        const bancount = this.client.settings.get(modcount, 'Ban', 0) + 1;

		try {
            await member.ban({ days: 1, reason: `Softbanned by ${message.author.tag} | Case #${totalCases}` })
            await message.guild.members.unban(member, `Softbanned by ${message.author.tag} | Case #${totalCases}`);
            try {
				await member.send(`*You have been softbanned from ${message.guild.name}** \n${reason ? `*Reason: ${reason}\n` : ''}, softban is a kick that uses ban + unban to remove your messages from the server, you may rejoin whenever*`);
			} catch {} 
		} catch (error) {
			return sentMessage.edit(`*${message.author}, I could not softban ${member.user.tag}*`);
        }

        this.client.settings.set(message.guild.id, 'caseTotal', totalCases);
        this.client.settings.set(modcount, 'Ban', bancount) + 1;
        
        const modLogChannel = this.client.settings.get(message.guild.id, 'modLogChannel', undefined);
		let modMessage;
		if (modLogChannel) {
			const embed = Util.logEmbed({message, client: this.client, member, caseNum: totalCases, action: 'Softban', reason}).setColor(Util.CONSTANTS.COLORS.SOFTBAN);
			modMessage = await (this.client.channels.get(modLogChannel)).send(embed);
        }
        
        return sentMessage.edit(`*Successfully softbanned ${member.user.tag}*`)
    }
}

module.exports = SoftBanCommand;