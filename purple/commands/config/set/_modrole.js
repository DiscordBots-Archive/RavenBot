const { Command } = require('discord-akairo');

class SetModRoleCommand extends Command {
    constructor() {
        super('set-modrole', {
           //aliases: ['set-mod'],
           description: {
               content: 'Sets the mod role of thr command use for permission checking',
               usage: '<role>',
               examples: ['@Mods', 'Mods', '85631234567890']
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

        const modrole = this.client.settings.get(message.guild.id, 'modRole', []);
        modrole.push(role.id);
        this.client.settings.set(message.guild.id, 'modRole', modrole);
		return message.util.reply(`set mod role to **${role.name}**`);
    }
}

module.exports = SetModRoleCommand;