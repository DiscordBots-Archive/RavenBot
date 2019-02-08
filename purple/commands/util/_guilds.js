const { Command } = require('discord-akairo');

class GuildsCommand extends Command {
    constructor() {
        super('guilds', {
            category: 'util',
            ratelimit: 2,
            ownerOnly: true,
            clientPermissions: ['ATTACH_FILES']
        });
    }

    async exec(message) {
        const users = this.client.guilds;
        
        const output = users.reduce((out, t) => {
			out += `Guild: ${t.name}\r\nId: ${t.id.replace(/\n/g, '\r\n')}\r\nOwner:${t.owner.user.tag}(${t.owner.user.id})\r\n\r\n========================================\r\n\r\n`;
			return out;
		}, '');

		return message.util.send('*total_guilds*', { files: [{ attachment: Buffer.from(output, 'utf8'), name: `${this.client.user.username.toLowerCase()}_guilds.txt` }] });
    }
}

module.exports = GuildsCommand;