const { Listener } = require('discord-akairo');
const moment = require('moment');

/*class GuildMemberUpdateRoleStateListener extends Listener {
	constructor() {
		super('guildMemberUpdateRoleState', {
			emitter: 'client',
			event: 'guildMemberUpdate',
			category: 'client'
		});
	}

	async exec(newMember) {
		const uniqueid =  moment(new Date()).format('YYYYMMDDhhmmssSSS');
        await newMember.guild.members.fetch(newMember.id);
        if (newMember.roles) {
            const roles = newMember.roles.filter(role => role.id !== newMember.guild.id).map(role => role.id);
            if (roles.length) {

                let roleid = ''
                newMember.roles.forEach(role => {

                    roleid = role.id
                    console.log(roleid)
                    console.log(newMember.guild.id)
                    console.log(newMember.user.id)

                    const data = this.client.Roles.create({
                        name: uniqueid,
                        guild: newMember.guild.id,
                        user: newMember.user.id,
                        role_id: roleid
                    })
                });

                console.log(roles.length)

            } else {
                this.client.Roles.destroy({where: {user: newMember.id}})
            }
        }
	}
}
module.exports = GuildMemberUpdateRoleStateListener;*/