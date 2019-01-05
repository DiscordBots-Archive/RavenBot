const Discord = require('discord.js');

module.exports = {
    name: 'history',
	type: 'Info',
	usage: ' ',
    description: 'History of a member',
    guildOnly: true,

	async execute(message, args, client) {

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (member) {

            let uniquecode = member.user.id + message.guild.id;

            try {
                const tags = await client.UserHistory.create({
                    name: uniquecode,
                    guild: message.guild.id,
                    userid: member.user.id,
                    username: member.user.tag,
                    avatarurl: member.user.displayAvatarURL,
                    roleid: member.highestRole.id,
                });

                const tag = await client.UserHistory.findOne({where: { name: uniquecode } });
                const embed = new Discord.RichEmbed()
                .setTitle(member.user.tag + ' | ' + member.user.id)
                .setFooter(`${tag.get('warnings')} warnings, ${tag.get('restrictions')} restrictions, ${tag.get('mutes')} mutes, ${tag.get('kicks')} kicks and ${tag.get('bans')} bans`)
                return message.channel.send({embed});
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {

                    const tag = await client.UserHistory.findOne({where: { name: uniquecode } });
                    const embed = new Discord.RichEmbed()
                    .setTitle(member.user.tag + ' | ' + member.user.id)
                    .setFooter(`${tag.get('warnings')} warnings, ${tag.get('restrictions')} restrictions, ${tag.get('mutes')} mutes, ${tag.get('kicks')} kicks and ${tag.get('bans')} bans`)
                    return message.channel.send({embed}).then(() => {
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
                    })
                }
                return message.channel.send('Something went wrong with adding a userdata!');
            }

        } else if (!member) {

            let uniquecode = message.author.id + message.guild.id;

            try {
                const tags = await client.UserHistory.create({
                    name: uniquecode,
                    guild: message.guild.id,
                    userid: message.author.id,
                    username: message.author.tag,
                    avatarurl: message.author.displayAvatarURL,
                    roleid: message.member.highestRole.id,
                });

                const tag = await client.UserHistory.findOne({where: { name: uniquecode } });
                const embed = new Discord.RichEmbed()
                .setTitle(message.author.tag + ' | ' + message.author.id)
                .setFooter(`${tag.get('warnings')} warnings, ${tag.get('restrictions')} restrictions, ${tag.get('mutes')} mutes, ${tag.get('kicks')} kicks and ${tag.get('bans')} bans`)
                return message.channel.send({embed});
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    const tag = await client.UserHistory.findOne({where: { name: uniquecode } });
                    const embed = new Discord.RichEmbed()
                    .setTitle(message.author.tag + ' | ' + message.author.id)
                    .setFooter(`${tag.get('warnings')} warnings, ${tag.get('restrictions')} restrictions, ${tag.get('mutes')} mutes, ${tag.get('kicks')} kicks and ${tag.get('bans')} bans`)
                    return message.channel.send({embed}).then(() => {
                        const roleupdate = await client.UserHistory.update({ roleid: message.member.highestRole.id }, { where: { name: uniquecode } });
                        if (roleupdate > 0) {
                            return; //console.log('Updated');
                        }
                        const nameupdate = await client.UserHistory.update({ username: message.author.tag }, { where: { name: uniquecode } });
                        if (nameupdate > 0) {
                            return; //console.log('Updated');
                        }
                        const avatarupdate = await client.UserHistory.update({ avatarurl: message.author.displayAvatarURL }, { where: { name: uniquecode } });
                        if (avatarupdate > 0) {
                            return; //console.log('Updated');
                        }
                    })

                }
                return message.channel.send('Something went wrong with adding a userdata!'+e);
            }
        }

	},
};
