const Discord = require('discord.js');
module.exports = {
    name: 'sync',
	type: 'Mod',
	usage: ' ',
    description: 'Fetch all members data',
    adminonly: true,
	
	async execute(message, args, client) {

        /*message.guild.members.forEach(async member => {

            const uniquecode = member.user.id + message.guild.id;

            try {
                const tags = await client.UserHistory.create({
                    name: uniquecode,
                    guild: message.guild.id,
                    userid: member.user.id,
                });
                return;
            }
            catch (e) {

                if (e.name === 'SequelizeUniqueConstraintError') {
                    return;
                }
                return message.channel.send('Something went wrong with adding a userdata!');
            }
        });*/
        client.guilds.forEach(async guild => {

            guild.members.forEach(async member => {
        
                const uniquecode = member.user.id + guild.id;
        
                try {
                    const tags = await client.UserHistory.create({
                        name: uniquecode,
                        guild: guild.id,
                        userid: member.user.id,
                    });
                    return console.log(tags.name)
                }
                catch (e) {
                    if (e.name === 'SequelizeUniqueConstraintError') {
                        return;
                    }
                    return console.log(e)
                }
            });
        });
    },
};
