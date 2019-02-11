const { Command } = require('discord-akairo');

class DownloadStatsCommand extends Command {
    constructor() {
        super('dlstats', {
            category: 'util',
            ratelimit: 2,
            clientPermissions: ['ATTACH_FILES'],
            ownerOnly: true,
        });
    };

    async exec(message) {

        const data = await this.client.prometheus.register.metrics();
        let output = data.replace(/\n/g, '\r\n');
		return message.util.send('*main_stats*', { files: [{ attachment: Buffer.from(output, 'utf8'), name: `${this.client.user.username.toLowerCase()}_stats.txt` }] } );
    };
};
module.exports = DownloadStatsCommand;