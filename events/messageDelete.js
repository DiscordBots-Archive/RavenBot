const Discord = require('discord.js');
module.exports = async (client, message) => {
    const logs = message.guild.channels.find(channel => channel.name === "deleted-message");
    if (!logs) return;
	/*if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
	  message.guild.createChannel('logs', 'text');
	}
	if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
	  console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
	}*/
    const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
    if (message.author.bot == true) return;
	let user = ""
	let userid = ""
	  if (entry.extra.channel.id === message.channel.id
		&& (entry.target.id === message.author.id)
		&& (entry.createdTimestamp > (Date.now() - 5000))
		&& (entry.extra.count >= 1)) {
		user = entry.executor.tag
		userid = entry.executor.id
	} else { 
		user = message.author.tag
		userid = message.author.id
  }

    const embed = new Discord.RichEmbed()
    .setTitle(user + ' | ' + userid)
    .addField('Channel', '<#' + message.channel.id + '>')
    .addField('Content', message)
    .setFooter('Message Deleted', entry.executor.displayAvatarURL)
    .setTimestamp()
		logs.send({embed});
}