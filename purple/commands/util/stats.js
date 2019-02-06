const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const os = require('os-utils');
const moment = require('moment');
const duration = require('moment-duration-format');

class StatsCommand extends Command {
    constructor() {
        super('stats', {
           aliases: ['stats'],
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

        const client = this.client;

        let owner = this.client.users.get(this.client.ownerID)
        
        const duration = moment.duration(client.uptime).format("D [days], H [hrs], m [mins], s [secs]");

        const embed = new MessageEmbed()
        .setColor('#fcfb04')

        .setTitle(`CLIENT STATISTICS`)
        .setThumbnail(client.user.displayAvatarURL())
        .setURL('https://discordapp.com/oauth2/authorize?client_id=499250383785558026&scope=bot&permissions=2146958847')

        .addField("❯ MEMORY USAGE", `• Using : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`+
        `\n• Free : ${Math.round(os.freemem())} MB`)
        
        .addField("❯ UPTIME", `• ${duration}`)
    
        .addField("❯ GENERAL STATS", `\n• Servers : ${client.guilds.size}` +
        `\n• Users : ${client.users.size}` + 
        `\n• Channels : ${client.channels.size}` )
        .addField('❯ SINCE', `• ${moment(client.user.createdAt).format("DD-MM-YY kk:mm")}`)

        .addField("❯ LIBRARY", `[• discord.js-akairo](https://discord.js.org)`)

        .setFooter('© 2018 ' + owner.tag, owner.displayAvatarURL())

        //return message.util.send(embed);
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