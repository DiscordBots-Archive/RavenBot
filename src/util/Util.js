const { MessageEmbed, User } = require('discord.js');
const { oneLine, stripIndent } = require('common-tags');
const ms = require('ms');
const ACTIONS = ({
	1: 'ban',
	2: 'unban',
	3: 'kick',
	4: 'kick',
	5: 'mute',
	6: 'restriction',
	7: 'restriction',
	8: 'restriction',
	9: 'warn'
});
const Util = {

    CONSTANTS : {
        ACTIONS: {
			BAN: 1,
			UNBAN: 2,
			SOFTBAN: 3,
			KICK: 4,
			MUTE: 5,
			EMBED: 6,
			EMOJI: 7,
			REACTION: 8,
			WARN: 9
		},
        COLORS : {
            BAN: 16718080,
            UNBAN: 8450847,
            SOFTBAN: 16745216,
            KICK: 16745216,
            MUTE: 16763904,
            EMBED: 16776960,
            EMOJI: 16776960,
            REACTION: 16776960,
            WARN: 16776960
        }
    },

    logEmbed : ({message, member, duration, caseNum, action, reason}) => {

        const embed = new MessageEmbed().setTimestamp().setFooter(`Case ${caseNum}`)
        if (message) embed.setAuthor(`${message.member.user.tag} (${message.member.user.id})`, message.member.user.displayAvatarURL())
        embed.setDescription(stripIndent`**Member:** ${member instanceof User ? member.tag : member.user.tag} (${member.id})
        **Action:** ${action}${action === 'Mute' && duration ? `\n**Length:** ${ms(duration, { long: true })}` : ''}
        **Reason:** ${reason}`);
        return embed;
    },

    historyEmbed : ({ message, member, cases }) => {
        const footer = cases.reduce((count, c) => {
			const action = ACTIONS[c.action];
			count[action] = (count[action] || 0) + 1;
			return count;
		}, {});
		const colors = [8450847, 10870283, 13091073, 14917123, 16152591, 16667430, 16462404];
		const values = [footer.warn || 0, footer.restriction || 0, footer.mute || 0, footer.kick || 0, footer.ban || 0];
		const [warn, restriction, mute, kick, ban] = values;
		const colorIndex = Math.min(values.reduce((a, b) => a + b), colors.length - 1);
        return new MessageEmbed().setColor(colors[colorIndex])
        .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
        .setFooter(oneLine`${warn} warning${warn > 1 || warn === 0 ? 's' : ''},
        ${restriction} restriction${restriction > 1 || restriction === 0 ? 's' : ''},
        ${mute} mute${mute > 1 || mute === 0 ? 's' : ''},
        ${kick} kick${kick > 1 || kick === 0 ? 's' : ''},
        and ${ban} ban${ban > 1 || ban === 0 ? 's' : ''}`);
    },

    paginate : ({ items, page = 1, pageLength = 10 }) => {
        const maxPage = Math.ceil(items.length / pageLength);
        if (page < 1) page = 1;
        if (page > maxPage) page = maxPage;
        const startIndex = (page - 1) * pageLength;
    
        return {
            items: items.length > pageLength ? items.slice(startIndex, startIndex + pageLength) : items,
            page,
            maxPage,
            pageLength
        };
    },
    
    timeString : ({seconds, forceHours = false, ms = true}) => {
        if (ms) seconds /= 1000;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds % 3600 / 60);
    
        return `${forceHours || hours >= 1 ? `${hours}:` : ''}${hours >= 1 ? `0${minutes}`.slice(-2) : minutes}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;
    }
}

module.exports = Util;