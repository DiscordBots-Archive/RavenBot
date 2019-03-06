const { Command } = require('discord-akairo');
const Rolestate = require('../../models/Rolestate');

class ReloCommand extends Command {
	constructor() {
		super('rel', {
			aliases: ['rp'],
            category: 'null',
            args: [
                {
                    id: 'member', type: 'member', default: message => message.member
                }
            ]
		});
	}

	async exec(message, { member }) {
        //const R = await this.client.settings.get(message.guild, 'restrictRoles', undefined);
        //console.log(`${R.embed}, ${R.emoji}, ${R.reaction}`)
        /*const roles = message.member.roles.filter(role => role.id !== message.guild.id).map(role => role.id);
        console.log(roles)
        await Roles.create({
            guildID: message.guild.id,
            userID: message.author.id,
            RolesID: roles
        })*/
        const roles = await Rolestate.findOne({ where: { userID: member.id }});
        return message.util.send(roles.rolesID);
        //console.log(roles.rolesID)
        //await message.member.roles.add(roles.RolesID, '::')
	}
}

module.exports = ReloCommand;
