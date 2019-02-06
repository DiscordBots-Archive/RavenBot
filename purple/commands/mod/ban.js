const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class BanCommand extends Command {
    constructor() {
        super('ban', {
           aliases: ['ban'],
           category: 'mod',
           description: {
               content: 'Bans a member, bruh.',
               usage: '<member> <...reason>',
               examples: ['@Purple']
           },
           channel: 'guild',
           clientPermissions: ['EMBED_LINKS', 'BAN_MEMBERS'],
           userPermissions: ['BAN_MEMBERS'],
           ratelimit: 2,
           args: [
               {
                   id: 'member',
                   type: 'member',
                   prompt: {
                       start: message => `*${message.author}, what member do you want to ban?*`,
                       retry: message => `*${message.author}, please mention a member...*`
                   }
               },
               {
                   id: 'reason',
                   match: 'rest',
                   type: 'string',
                   default: 'Not Provided',
               }
           ]
        });
    }

    async exec(message, args) {

        const member = args.member;
        const reason = args.reason;

        const embed = this.client.historyEmbed({message, member}).setColor(this.client.CONSTANTS.COLORS.BAN)
		await message.channel.send('*You sure you want me to ban this member?*', { embed });
		const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {
			max: 1,
			time: 10000
		});

		if (!responses || responses.size !== 1) {
			return message.reply('*timed out_ cancelled ban*');
		}
		const response = responses.first();

		let sentMessage;
		if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {
			sentMessage = await message.channel.send(`*Banning ${member.user.tag}...*`);
		} else {
			return message.reply('*cancelled ban*');
		}

        const modcount = message.guild.id + member.user.id;
        const totalCases = this.client.settings.get(message.guild.id, 'caseTotal', 0) + 1;
        const bancount = this.client.settings.get(modcount, 'Ban', 0 ) + 1;

		try {
            await member.ban({ days: 1, reason: `Banned by ${message.author.tag} | Case #${totalCases}` });
            try {
				await member.send(`*You have been banned from ${message.guild.name}* \n${reason ? `*Reason: ${reason}*\n` : ''}`);
			} catch {} 
		} catch (error) {
			return sentMessage.edit(`*${message.author} I could not ban ${member.user.tag}*`);
        }

        this.client.settings.set(message.guild.id, 'caseTotal', totalCases);
        this.client.settings.set(modcount, 'Ban', bancount);
        
        const modLogChannel = this.client.settings.get(message.guild.id, 'modLogChannel', undefined);
		let modMessage;
		if (modLogChannel) {
			const embed = this.client.logEmbed({message, member, caseNum: totalCases, action: 'Ban', reason}).setColor(this.client.CONSTANTS.COLORS.BAN);
			modMessage = await (this.client.channels.get(modLogChannel)).send(embed);
        }
        
        return sentMessage.edit(`*Successfully banned ${member.user.tag}*`)
    }
}

module.exports = BanCommand;