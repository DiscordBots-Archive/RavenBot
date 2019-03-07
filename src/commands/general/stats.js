const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const os = require('os-utils');
const moment = require('moment'); require('moment-duration-format');
const { version } = require('../../../package.json');

class StatsCommand extends Command {
    constructor() {
        super('stats-cmd', {
            aliases: ['stats'],
            category: 'util',
            clientPermissions: ['EMBED_LINKS'],
            ratelimit: 2,
            description: { content: 'Displays statistics about the bot' }
        });
    }

    async exec(message) {

        const embed = new MessageEmbed().setColor('RED').setTitle(`${this.client.user.username} Statistics`)
        .setThumbnail(this.client.user.displayAvatarURL())
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=2146958847`)

        .addField("❯ Memory Usage", `• Using : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`+
        `\n• Free : ${Math.round(os.freemem())} MB`)
        
        .addField("❯ Uptime", `• ${moment.duration(this.client.uptime).format("M [months], W [weeks], D [days], H [hrs], m [mins], s [secs]")}`)
    
        .addField("❯ General Stats", `\n• Servers : ${this.client.guilds.size}` +
        `\n• Users : ${this.client.users.size}` + 
        `\n• Channels : ${this.client.channels.size}` )
        //.addField('❯ SINCE', `• ${moment(this.client.user.createdAt).format("DD-MM-YY kk:mm")}`)
        .addField('❯ Version', `• v${version}`)

        .addField("❯ Library", `• [discord.js](https://discord.js.org)[-akairo](https://github.com/1Computer1/discord-akairo)`)

        .setFooter('© 2018 ' + this.client.users.get(this.client.ownerID).tag, this.client.users.get(this.client.ownerID).displayAvatarURL())

        if (message.channel.type === 'dm' || !(message.channel).permissionsFor(message.guild.me).has(['ADD_REACTIONS', 'MANAGE_MESSAGES'], false)) {
			return message.util.send({ embed });
		}
        const msg = await message.util.send({ embed });
		msg.react('🗑');
		let react;
		try {
			react = await msg.awaitReactions(
				(reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id,
				{ max: 1, time: 30000, errors: ['time'] }
			);
		} catch (error) {
			msg.reactions.removeAll();

			return message;
		}
		react.first().message.delete();

		return message;
    }
}

module.exports = StatsCommand;