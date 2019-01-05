const Discord = require('discord.js');
module.exports = {
  name: 'kick',
  type: 'Mod',
	usage: '@user/id [reason]',
  description: 'Mention a member and kick him',
  example: ['kick @Purple posting ads', 'kick 499250383785558026 posting ads'],
  args: true,
  guildOnly: true,
  adminonly: true,

	async execute(message, args, client) {
  
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return;

    if (message.member.highestRole.position <=  member.highestRole.position) 
    return message.channel.send('You know you can\'t do it ' + '<:notlikecat:529505687773118484>');

    let reason = args.slice(1).join(' ');
    if (!reason) return message.channel.send('You must provide a reason to kick <:notlikecat:529505687773118484>');
  
    if (member == message.guild.members.get(message.author.id)) return;
    
    if (member == message.guild.members.get(client.user.id)) 
    return message.channel.send("Hello <:meww:523021051202895872>, that's me! **I'm not kickable!!!** <:huh:523021014481764352>");

    let uniquecode = member.user.id + message.guild.id;

    const tag = await client.UserHistory.findOne({where: { name: uniquecode } });
    if (!tag) return message.channel.send('No data found for this user!')

    const userembed = new Discord.RichEmbed()
    .setTitle(member.user.tag + ' | ' + member.user.id)
    .setFooter(`${tag.get('warnings')} warnings, ${tag.get('restrictions')} restrictions, ${tag.get('mutes')} mutes, ${tag.get('kicks')} kicks and ${tag.get('bans')} bans`)

    await message.channel.send(`You sure you want me to kick this user? <:notlikecat:529505687773118484>`, userembed);
    
		const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 });
    
		if (!responses || responses.size !== 1) {
			return message.channel.send('Timed out. Cancelled kick <:notlikecat:529505687773118484>');
		}

		const response = responses.first();

		let sentMessage;

		if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {

			sentMessage = await message.channel.send(`Kicking **${member.user.tag}**...`);

		} else {
			return message.channel.send('Cancelled kick <:notlikecat:529505687773118484>');
    }
  
    let mod_log_channel = message.guild.channels.find(c => c.name === "mod-log");

    const embed = new Discord.RichEmbed()
    .setTitle(`${member.user.tag} | ${member.user.id}`)
    .setColor("#f60839")
    .setTimestamp()
    .addField(`Mod`, message.author.tag)
    .addField( `Reason`, reason)
    .setFooter(`Kicked`, member.user.displayAvatarURL)

    try {
      await member.send({embed});
    } catch {}

    try {

      await member.kick(reason).then(() => {
        client.channels.get(mod_log_channel.id).send({embed});
        sentMessage.edit(`Successfully kicked **${member.user.tag}**...`);
        if (tag) {
          tag.increment('kicks');
        }
        setTimeout(() => {
          const roleupdate = client.UserHistory.update({ roleid: message.guild.id }, { where: { name: uniquecode } });
          if (roleupdate > 0) {
            return; //console.log('Updated');
          }
          return;
        }, 2000)
      })

    } catch (error) {
      sentMessage.edit(`I could not kick **${member.user.tag}** <:notlikecat:529505687773118484>`);
    }
	},
};
