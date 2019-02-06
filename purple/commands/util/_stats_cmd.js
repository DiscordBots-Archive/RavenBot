const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const os = require('os-utils');
const moment = require('moment');
const duration = require('moment-duration-format');

class StatsCommand extends Command {
    constructor() {
        super('stats-cmd', {
           description: {
               content: 'Displays statistics about me'
           },
           category: 'util',
           clientPermissions: ['EMBED_LINKS'],
           ratelimit: 2,
           typing: true,
        });
    }

    async exec(message) {

        const embed = new MessageEmbed().setColor('#fcfb04').setTitle(`PURPLE STATISTICS`)
        .setThumbnail(this.client.user.displayAvatarURL())
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=2146958847`)

        .addField("❯ MEMORY USAGE", `• Using : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`+
        `\n• Free : ${Math.round(os.freemem())} MB`)
        
        .addField("❯ UPTIME", `• ${moment.duration(this.client.uptime).format("D [days], H [hrs], m [mins], s [secs]")}`)
    
        .addField("❯ GENERAL STATS", `\n• Servers : ${this.client.guilds.size}` +
        `\n• Users : ${this.client.users.size}` + 
        `\n• Channels : ${this.client.channels.size}` )
        .addField('❯ SINCE', `• ${moment(this.client.user.createdAt).format("DD-MM-YY kk:mm")}`)

        .addField("❯ LIBRARY", `[• discord.js](https://discord.js.org)[-akairo](https://github.com/1Computer1/discord-akairo)`)

        .setFooter('© 2018 ' + this.client.users.get(this.client.ownerID).tag, this.client.users.get(this.client.ownerID).displayAvatarURL())

        const msg = await message.util.send({ embed });
		msg.react('🗑');
		let react;
		try {
			react = await msg.awaitReactions(
				(reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id,
				{ max: 1, time: 10000, errors: ['time'] }
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