const { Command } = require('discord-akairo');

class DownloadCommand extends Command {
    constructor() {
        super('tag-download', {
           aliases: ['download-tags', 'dl-tags'],
           description: {
               content: 'Download your server tags',
           },
           category: 'tag',
           channel: 'guild',
           ratelimit: 2,
           clientPermissions: ['ATTACH_FILES']
        });
    }

    async exec(message) {
        const tagList = await this.client.Tags.findAll( { where: { guild: message.guild.id } }, { attributes: ['tag_name'] },);
        const output = tagList.reduce((out, t) => {
			out += `Name: ${t.tag_name}\r\nContent:\r\n${t.tag_content.replace(/\n/g, '\r\n')}\r\n\r\n========================================\r\n\r\n`;
			return out;
		}, '');

		return message.util.send('~<a:load:532929637102387210>~', { files: [{ attachment: Buffer.from(output, 'utf8'), name: `${message.guild.name}.txt` }] });
    }
}

module.exports = DownloadCommand;