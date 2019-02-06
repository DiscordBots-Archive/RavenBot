const { Command } = require('discord-akairo');

class UsersCommand extends Command {
    constructor() {
        super('users', {
            category: 'util',
            ratelimit: 2,
            clientPermissions: ['ATTACH_FILES'],
            ownerOnly: true,
        });
    }

    async exec(message) {
        const users = this.client.users;
        
        const output = users.reduce((out, t) => {
			out += `Usertag: ${t.tag}\r\nUserid: ${t.id.replace(/\n/g, '\r\n')}\r\n\r\n========================================\r\n\r\n`;
			return out;
		}, '');

		return message.util.send('~<a:load:532929637102387210>~', { files: [{ attachment: Buffer.from(output, 'utf8'), name: `${this.client.user.username}_users.txt` }] });
    }
}

module.exports = UsersCommand;