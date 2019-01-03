const Discord = require('discord.js');

module.exports = async (client, message) => {

	const logs = message.guild.channels.find(channel => channel.name === "deleted-message");
	if (!logs) return;

	const attachment = message.attachments.first();

	const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());

	if (message.author.bot == true) return;
	if (entry.executor.bot == true) return;

	let user = ""
	let userid = ""

	if (entry.extra.channel.id === message.channel.id
		&& (entry.target.id === message.author.id)
		&& (entry.createdTimestamp > (Date.now() - 5000))
		&& (entry.extra.count >= 1)) {
		user = entry.executor.tag
		userid = entry.executor.id
	}  else { 
		user = message.author.tag
		userid = message.author.id
	}
	const embed = new Discord.RichEmbed()
	.setTitle(user + ' | ' + userid)
	.addField('Channel', '<#' + message.channel.id + '>')
	if (message.content) embed.addField('Content', message.content)
	if (attachment) embed.addField('Attachment', attachment.url)
	embed.setFooter('Message Deleted' )
	embed.setTimestamp()
	logs.send({embed});
}