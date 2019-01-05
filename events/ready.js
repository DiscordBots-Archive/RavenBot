const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = (client) => {
    
    console.log(`logging In: Client: ${client.user.tag}, Users: ${client.users.size}, Channels: ${client.channels.size}, Servers: ${client.guilds.size}`);
    client.user.setActivity(`@${client.user.username} help`, {type: 'STREAMING'});

    const channel = client.channels.find(ch => ch.id === '516098181549916172');
    if (!channel) return;

    const embed = new Discord.RichEmbed()
    .setColor('#9bf10c')
    //.setThumbnail(client.user.displayAvatarURL)
    .setFooter(`${client.user.username}`, 'https://discordemoji.com/assets/emoji/DiscordHype.gif')
    .setTimestamp()
    .setTitle(`${client.user.tag} | ${client.user.id}`)
    .setDescription(`${client.guilds.size} SERVERS, ${client.users.size} USERS, ${client.channels.size} CHANNELS`)

    channel.send({embed}); 

    client.guilds.forEach(async guild => {

        guild.members.forEach(async member => {
    
            const uniquecode = member.user.id + guild.id;
    
            try {
                const tags = await client.UserHistory.create({
                    name: uniquecode,
                    guild: guild.id,
                    userid: member.user.id,
                    username: member.user.tag,
                    avatarurl: member.user.displayAvatarURL,
                    roleid: member.highestRole.id,
                });
                return; //console.log(tags.name)
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
                    //return; //console.log(name)
                }
                return console.log(e)
            }
        });
    });
}
