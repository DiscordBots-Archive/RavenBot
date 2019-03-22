const { Command } = require('discord-akairo');
const moment = require('moment'); require('moment-duration-format');

class UptimeCommand extends Command {
    constructor() {
        super('uptime', {
            aliases: ['uptime'],
            category: 'general',
            clientPermissions: ['EMBED_LINKS'],
            description: {
                content: 'Displayes uptime of the bot.'
            }
        })
    }

    exec(message) {
        const duration = moment.duration(this.client.uptime).format("M [months], W [weeks], D [days], H [hrs], m [mins], s [secs]");
        const embed = this.client.util.embed()
        .setAuthor(duration).setColor(0x8387db)
        return message.util.send({ embed });
    }
}

module.exports = UptimeCommand;