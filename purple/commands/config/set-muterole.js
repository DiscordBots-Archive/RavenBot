const { Command } = require('discord-akairo');

class SetMuteRoleCommand extends Command {
    constructor() {
        super('set-muterole', {
           aliases: ['set-muterole'],
           description: {
               content: 'Sets the mute role of thr command use for permission checking.',
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
                       retry: message => `${message.author}, please provide a valid role`
                   }
               }
           ]
        });
    }

    async exec(message, args) {

        const role = args.role;
        this.client.settings.set(message.guild.id, 'muteRole', role.id);
		return message.util.reply(`set mute role to **${role.name}**`);
    }
}

module.exports = SetMuteRoleCommand;