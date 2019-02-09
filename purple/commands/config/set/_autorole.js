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

        this.client.settings.set(message.guild.id, 'autoRole', role.id);
        return message.util.reply(`set automatic role to **${role.name}**`);
        
    }
}

module.exports = SetAutoRoleCommand;