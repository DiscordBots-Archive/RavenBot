const { Command } = require('discord-akairo');
const Util = require('../../util/index.js');

class AddRoleCommand extends Command {
    constructor() {
        super('addrole', {
            //aliases: ['role'],
            description: {
                content: 'Add a role to a member, bruh!',
                usage: '<member> <role>',
                examples: ['@Purple @Admin', 'Purple Admin'],
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
                        start: message => `${message.author}, who is the member?`,
                        retry: message => `${message.author}, please mention a member...`
                    }
                },
                {
                    id: 'role',
                    type: 'role',
                    prompt: {
                        start: message => `${message.author}, what is the role?`,
                        retry: message => `${message.author}, please provide a valid role...`
                    }
                }
            ]
        });
    }

    async exec(message, { member, role }) {

        let sentMessage;
        if (member.roles.has(role.id)) {
            sentMessage = await message.channel.send(`Adding **${role.name}** role to **${member.user.tag}**...`);
            await member.roles.add(role, `Added by ${message.author.tag}`);
        }
		try {

		} catch (error) {
			return message.reply(`I could not add **${role.name}** role to **${member.user.tag}**`);
        }

        return message.util.send(`Successfully added **${role.name}** role to **${member.user.tag}**...`);
        
        
    }
}

module.exports = AddRoleCommand;