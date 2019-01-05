const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = async (client, member) => {

    const embed = new Discord.RichEmbed()
    .setColor('#08f885')
    .setTimestamp()
    .setFooter(`USER JOINED`, member.user.displayAvatarURL)
    .setTitle(`${member.user.tag} | ${member.user.id}`)

    if (member.user.bot === true) return;

    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!channel) return;
    const embedchannel = member.guild.channels.find(ch => ch.name === 'member-log');
    if (!embedchannel) return;

    if (member.guild.id === '500004711005683717') {
        client.channels.get(channel.id).send(`Hello ${member}, Welcome to **${member.guild.name}** :tada:`);
        setTimeout(() => {
            client.channels.get(channel.id).send("If you're new to the server you should only see three chats." + "\n" + "To gain access to this server please react to the post in <#501395897322831875> with the checkmark by clicking it!")
        }, 2000);

        client.channels.get(embedchannel.id).send({embed});

    } else {
        
        client.channels.get(embedchannel.id).send({embed});
    }

    const uniquecode = member.user.id + member.guild.id;

    const findrole = await client.UserHistory.findOne({where: { name: uniquecode } });
    if (!findrole) return;

    let role = member.guild.roles.get(`${findrole.get('roleid')}`);

    try {
        await member.addRole(role);
    } catch {}


    try {
        const tags = await client.UserHistory.create({
            name: uniquecode,
            guild: member.guild.id,
            userid: member.user.id,
            username: member.user.tag,
            avatarurl: member.user.displayAvatarURL,
            roleid: member.highestRole.id,
        });
        return; //console.log(tags.name + tags.username);
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
        return console.log(e);
    }

}
