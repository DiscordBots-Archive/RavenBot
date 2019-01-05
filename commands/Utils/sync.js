const Discord = require('discord.js');
module.exports = {
    name: 'sync-database',
	type: 'null',
	usage: ' ',
    description: 'Fetch all members data',
    adminonly: true,
	
	async execute(message, args, client) {

        client.guilds.forEach(async guild => {

            guild.members.forEach(async member => {
        
                const uniquecode = member.user.id + guild.id;
        
                try {
                    const tags = await client.UserHistory.create({
                        name: uniquecode,
                        guild: member.guild.id,
                        userid: member.user.id,
                        username: member.user.tag,
                        avatarurl: member.user.displayAvatarURL,
                        roleid: member.highestRole.id,
                    });
                    
                    return console.log(tags.username)
                }
                catch (e) {
                    if (e.name === 'SequelizeUniqueConstraintError') {
                        const roleupdate = await client.UserHistory.update({ roleid: member.highestRole.id }, { where: { name: uniquecode } });
                        if (roleupdate > 0) {
                            return; //console.log('Updated');
                        }
                        const nameupdate = await client.UserHistory.update({ username: member.user.tag }, { where: { name: uniquecode } });
                        if (nameupdate > 0) {
                            return; //console.log('Updated');
                        }
                        const avatarupdate = await client.UserHistory.update({ avatarurl: member.user.displayAvatarURL }, { where: { name: uniquecode } });
                        if (avatarupdate > 0) {
                            return; //console.log('Updated');
                        }
                    }
                    return console.log(e)
                }
            });
        });
    },
};
