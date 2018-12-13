const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  if (message.channel.type == 'dm') {
    message.channel.send("This is Not a right place to use this Command!");
  }

  if (!message.member.roles.some(r=>['Dev', 'Admin'].includes(r.name)) ) {
    message.channel.send(`Only Admins can use this Command`);
  }

  let member = message.mentions.members.first();

  if (!member) {
    message.channel.send(`Please mention a valid member of this Server!`);
  }

  if (member == message.guild.members.get(message.author.id)) {
    message.channel.send("Don't kick yourself Idiot!");
  } else if (member == message.guild.members.get(client.user.id)) {
    message.channel.send("You can't kick me!");
  }

  if (member.roles.has('513284645274517504')) {
    message.channel.send("You can't kick a Staff!");
  } else if (member.roles.has('500683658009640975')) {
    message.channel.send("You can't kick an Admin");
  } else if (member.roles.has('500683949018710036')) {
    message.channel.send("You can't kick an Admin!");
  }

  if (!member.kickable) {
    message.channel.send("I could not kick this user!");
  }

  let reason = args.join('');
  if (!reason) {
    reason = "";
  }

  await member.kick(reason)
  .catch(error => message.channel.send(`I could not kick this user! \n ${error}`));

  let mod_log_channel = message.guild.channels.find(c => c.name === "mod-log");

  const embed = new Discord.RichEmbed()
  .setTitle(`${member.user.tag} | ${member.user.id}`)
  .setColor("")
  .setTimestamp()
  .setDescription(`${reason !== null ? `Reason: ${reason}` : ""}`)
  .setFooter(`Kicked`)

  client.channels.get(mod_log_channel.id).send({embed});
  message.channel.send("Done. User has been Kicked <a:hype:515571561345056783>");
}
