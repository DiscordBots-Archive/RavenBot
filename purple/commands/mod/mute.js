const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const ms = require('ms');

class MuteCommand extends Command {
    constructor() {
        super('mute', {
           aliases: ['mute'],
           category: 'mod',
           description: {
               content: 'Mutes a member, bruh!',
               usage: '<member> <...reason>',
               examples: ['@Purple posting ads']
           },
           channel: 'guild',
           clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS'],
           userPermissions: ['MANAGE_ROLES'],
           ratelimit: 2,
           args: [
               {
                   id: 'member',
                   type: 'member',
                   prompt: {
                       start: message => `${message.author}, what member do you want to mute?`,
                       retry: message => `${message.author}, please mention a member`
                   }
               },
               {
                   id: 'duration',
                   type: str => {
                       if (!str) return;
                       const duration = ms(str);
                       if (duration && duration >= 300000 && !isNaN(duration)) return duration;
                       return;
                   },
                   prompt: {
                       start: message => `${message.author}, for how long do you want the mute to last?`,
                       retry: message => `${message.author}, please use proper time format...`
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

    async exec(message, { member, duration, reason}) {

        const muteRole = this.client.settings.get(message.guild.id, 'muteRole', undefined);
		if (!muteRole) return message.reply('there is no mute role configured on this server');

        const embed = this.client.historyEmbed({message, member}).setColor(this.client.CONSTANTS.COLORS.SOFTBAN)
		await message.channel.send('You sure you want me to mute this?', { embed });
		const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {
			max: 1,
			time: 10000
		});

		if (!responses || responses.size !== 1) {
			return message.reply('timed out. Cancelled mute.');
		}
		const response = responses.first();

		let sentMessage;
		if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {
			sentMessage = await message.channel.send(`Muting **${member.user.tag}**...`);
		} else {
			return message.reply('cancelled mute.');
		}

        const modcount = message.guild.id + member.user.id;
        const totalCases = this.client.settings.get(message.guild.id, 'caseTotal', 0) + 1;
        const mutecount = this.client.settings.get(modcount, 'Mute', 0) + 1;

		try {
            await member.roles.add(muteRole, `Muted by ${message.author.tag} | Case #${totalCases}`);
            try {
				await member.send(`*You have been muted from ${message.guild.name} \n${reason ? `Reason: ${reason}*\n` : ''}`);
            } catch {} 
		} catch (error) {
			return sentMessage.edit(`${message.author} I could not mute **${member.user.tag}**`);
        }

        try {
            const time = await this.client.Mute.create({
                name: message.guild.id + member.user.id,
                user: member.user.id,
                author: message.author.id,
                guild: message.guild.id,
                time: new Date(Date.now() + duration)
            })
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return message.util.reply(`*This user is already muted by other mods...*`)
            }
            return;
        }

        this.client.settings.set(message.guild.id, 'caseTotal', totalCases);
        this.client.settings.set(modcount, 'Mute', mutecount);
        
        const modLogChannel = this.client.settings.get(message.guild.id, 'modLogChannel', undefined);
		let modMessage;
		if (modLogChannel) {
			const embed = this.client.logEmbed({message, member, caseNum: totalCases, action: 'Mute', reason}).setColor(this.client.CONSTANTS.COLORS.MUTE);
			modMessage = await (this.client.channels.get(modLogChannel)).send(embed);
        }
        
        return sentMessage.edit(`Successfully muted **${member.user.tag}**`)
    }
}

module.exports = MuteCommand;