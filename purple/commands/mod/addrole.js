const { Command } = require('discord-akairo');

class AddRoleCommand extends Command {
    constructor() {
        super('addrole', {
           //aliases: ['roleadd', 'role'],
           description: {
               content: 'Add a role to a member, bruh!',
               usage: '<member> <role>',
               examples: ['@Purple @Admin', '@Purple Admin']
           },
           category: 'mod',
           channel: 'guild',
           clientPermissions: ['MANAGE_ROLES'],
           userPermissions: ['MANAGE_GUILD'],
           ratelimit: 2,
           args: [
               {
                   id: 'member',
                   type: 'member',
                   prompt: {
                       start: message => `${message.author}, what member do you want to add role?`,
                       retry: message => `${message.author}, please mention a member`
                   }
               },
               {
                   id: 'role',
                   type: 'role',
                   prompt: {
                       start: message => `${message.author}, what role do you want to add?`,
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
			sentMessage = await message.channel.send(`Adding **${role.name}** role to **${member.user.tag}**...`);
			await member.roles.add(role, `Added by ${message.author.tag}`);
		} catch (error) {
			return message.reply(`I could not add **${role.name}** role to **${member.user.tag}**`);
        }

        return message.util.send(`Successfully added **${role.name}** role to **${member.user.tag}**...`)
        
    }
}

module.exports = AddRoleCommand;