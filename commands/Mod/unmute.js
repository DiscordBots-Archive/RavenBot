const Discord = require('discord.js');
module.exports = {
  name: 'unmute',
  type: 'Mod',
	usage: '@user/id',
  description: 'Menation a muted user and unmute him',
  example: ['unmute @Purple', 'unmute 499250383785558026'],
  guildOnly: true,
  args: true,
  
	async execute(message, args, client) {

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return;

    if (message.member.highestRole.position <=  member.highestRole.position) 
    return message.channel.send('You know you can\'t do it ' + '<:notlikecat:529505687773118484>');
  
    if (member == message.guild.members.get(message.author.id)) return;
    
    if (member == message.guild.members.get(client.user.id)) return;

    let mod_log_channel = message.guild.channels.find(c => c.name === "mod-log");
  
    let muteRole = message.guild.roles.find(r => r.name === 'Muted');

    if (!member.roles.has(muteRole.id) )return;

    let uniquecode = member.user.id + message.guild.id;

    const tag = await client.UserHistory.findOne({where: { name: uniquecode } });
    if (!tag) return message.channel.send('No data found for this user!')

    const userembed = new Discord.RichEmbed()
    .setTitle(member.user.tag + ' | ' + member.user.id)
    .setFooter(`${tag.get('warnings')} warnings, ${tag.get('restrictions')} restrictions, ${tag.get('mutes')} mutes, ${tag.get('kicks')} kicks and ${tag.get('bans')} bans`)

    await message.channel.send(`You sure you want me to unmute this user? <:notlikecat:529505687773118484>`, userembed);
    
		const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 });
    
		if (!responses || responses.size !== 1) {
			return message.channel.send('Timed out. Cancelled unmute <:notlikecat:529505687773118484>');
		}

		const response = responses.first();

		let sentMessage;

		if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {

			sentMessage = await message.channel.send(`Unmuting **${member.user.tag}**...`);

		} else {
			return message.channel.send('Cancelled unmute <:notlikecat:529505687773118484>');
    }
  
    const embed = new Discord.RichEmbed()
    .setTitle(`${member.user.tag} | ${member.user.id}`)
    .setColor("#f60839")
    .setTimestamp()
    .addField(`Mod`, message.author.tag)
    .setFooter(`Unmuted`, member.user.displayAvatarURL)

    try {

      await member.removeRole(muteRole).then(() => {
        client.channels.get(mod_log_channel.id).send({embed});
        sentMessage.edit(`Successfully unmuted **${member.user.tag}**...`)    
      });

    } catch (error) {
      return sentMessage.edit(`I could not unmute **${member.user.tag}** <:notlikecat:529505687773118484>`)
    }

	},
};
