const Discord = require('discord.js');

module.exports = async (client, oldMessage, newMessage) => {

	const logs = client.channels.find(channel => channel.id === "524674423043784714");
	if (!logs) return;

	//const attachment = message.attachments.first();

	//const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());

	//if (message.author.bot == true) return;
    //if (entry.executor.bot == true) return;

    if (newMessage.content !== oldMessage.content) {
        //.send('message : ' + oldMessage + ' ' + 'edited : '+ newMessage)
    }
    
}