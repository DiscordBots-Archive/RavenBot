const { Command } = require('discord-akairo');

class RemoveRoleCommand extends Command {
    constructor() {
        super('remove-role', {
            aliases: ['remove-role'],
            category: 'mod',
            channel: 'guild',
            clientPermissions: ['MANAGE_ROLES'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'role',
                    type: 'role'
                }
            ],
            description: {
                content: 'Removes a role to a member.',
                usage: '<member> <role>',
                examples: ['@Suvajit @Admin', 'Suvajit Dev']
            }
        })
    }

    userPermissions(message) {
		const staffRole = this.client.settings.get(message.guild, 'modRole', undefined);
		const hasStaffRole = message.member.roles.has(staffRole);
		if (!hasStaffRole) return 'Moderator';
		return null;
	}

    async exec(message, { member, role }) {
        try {
            if (member && role) {
                await member.roles.remove(role, `Added by ${message.author.tag}`);
                return message.util.send(`Successfully removed **${role.name}** to **${member.user.tag}**`)
            } 
        } catch (error) {
            return message.util.send(`Error: ${error.message}`, { code: 'js' });
        }
    }
}

module.exports = RemoveRoleCommand;
