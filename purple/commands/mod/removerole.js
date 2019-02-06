const { Command } = require('discord-akairo');

class RemoveRoleCommand extends Command {
    constructor() {
        super('removerole', {
           //aliases: ['role-remove', 'de-role'],
           category: 'mod',
           description: {
               content: 'Removes a role from a member, bruh!',
               usage: '<member> <role>',
               examples: ['@Purple @Admin', '@Purple Admin']
           },
           channel: 'guild',
           clientPermissions: ['MANAGE_ROLES'],
           userPermissions: ['MANAGE_GUILD'],
           ratelimit: 2,
           args: [
               {
                   id: 'member',
                   type: 'member',
                   prompt: {
                       start: message => `${message.author}, what member do you want to remove role?`,
                       retry: message => `${message.author}, please mention a member`
                   }
               },
               {
                   id: 'role',
                   type: 'role',
                   prompt: {
                       start: message => `${message.author}, what role do you want to remove?`,
                       retry: message => `${message.author}, please mention a role or id`
                   }
               }
           ]
        });
    }

    async exec(message, args) {

        const member = args.member;
        const role = args.role;

        let sentMessage;
		try {
			sentMessage = await message.channel.send(`Removing **${role.name}** role from **${member.user.tag}**...`);
			await member.roles.remove(role, `Removed by ${message.author.tag}`);
		} catch (error) {
			return message.reply(`I could not remove **${role.name}** role from **${member.user.tag}**`);
        }

        return message.util.send(`Successfully removed **${role.name}** role from **${member.user.tag}**...`)
        
    }
}

module.exports = RemoveRoleCommand;