const { Command } = require('discord-akairo');

class UnMuteCommand extends Command {
    constructor() {
        super('unmute', {
           aliases: ['unmute'],
           category: 'mod',
           description: {
               content: 'Unmutes a member, bruh!',
               usage: '<member> <...reason>',
               examples: ['@Purple']
           },
           channel: 'guild',
           clientPermissions: ['MANAGE_ROLES'],
           userPermissions: ['MANAGE_GUILD'],
           ratelimit: 2,
           args: [
               {
                   id: 'member',
                   type: 'member',
                   prompt: {
                       start: message => `${message.author}, what member do you want to unmute?`,
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

    async exec(message, args) {

        const member = args.member;
        const reason = args.reason;

        const muteRole = this.client.settings.get(message.guild.id, 'muteRole', undefined);
        if (!muteRole) return message.reply('there is no mute role configured on this server.');
        
        const embed = this.client.historyEmbed({message, member}).setColor(this.client.CONSTANTS.COLORS.MUTE)
		await message.channel.send('You sure you want me to unmute this?', { embed });
		const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {
			max: 1,
			time: 10000
		});

		if (!responses || responses.size !== 1) {
			return message.reply('*timed out_ cancelled unmute..*');
		}
		const response = responses.first();

		let sentMessage;
		if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {
			sentMessage = await message.channel.send(`Unmuting **${member.user.tag}**...`);
		} else {
			return message.reply('cancelled unmute.');
		}

        const totalCases = this.client.settings.get(message.guild.id, 'caseTotal', 0) + 1;

		try {
			await member.roles.remove(muteRole, `Unmuted by ${message.author.tag} | Case #${totalCases}`).then(async () => {
                await this.client.Mute.destroy({where: {user: member.user.id}});
            });
		} catch (error) {
			return sentMessage.edit(`${message.author} I could not unmute **${member.user.tag}**`);
        }

        this.client.settings.set(message.guild.id, 'caseTotal', totalCases);
        
        const modLogChannel = this.client.settings.get(message.guild.id, 'modLogChannel', undefined);
		let modMessage;
		if (modLogChannel) {
			const embed = this.client.logEmbed({message, member, caseNum: totalCases, action: 'Unmute', reason}).setColor(this.client.CONSTANTS.COLORS.MUTE);
			modMessage = await (this.client.channels.get(modLogChannel)).send(embed);
        }
        
        return sentMessage.edit(`Successfully unmuted **${member.user.tag}**`)
    }
}

module.exports = UnMuteCommand;