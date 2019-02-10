const { Command } = require('discord-akairo');

class SetAutoRoleCommand extends Command {
    constructor() {
        super('set-autorole', {
           description: {
               content: 'Sets the automatic role of the guild',
               usage: '<role>',
               examples: ['@Member', 'Member', '85631234567890']
           },
           category: 'config',
           channel: 'guild',
           userPermissions: ['MANAGE_GUILD'],
           ratelimit: 2,
           args: [
               {
                   id: 'role',
                   match: 'content',
                   type: 'role',
                   prompt: {
                       start: message => `${message.author}, what role you want to set?`,
                       retry: message => `${message.author}, please provide a valid role...`
                   }
               }
           ]
        });
    }

    async exec(message, { role }) {

        const autorole = this.client.settings.get(message.guild.id, 'autoRole', []);
		if (autorole.includes(role.id)) {
			const index = autorole.indexOf(role.id);
			autorole.splice(index, 1);
			if (autorole.length === 0) this.client.settings.delete(message.guild.id, 'autoRole');
			else this.client.settings.set(message.guild.id, 'autoRole', autorole);

			return message.util.send(`*Successfully removed this auto role [**${role.name}**]*`);
		}
        modrole.push(role.id);
        this.client.settings.set(message.guild.id, 'autoRole', modrole);
		return message.util.reply(`*set auto role to **${role.name}**\u200b*`);
        
    }
}

module.exports = SetAutoRoleCommand;