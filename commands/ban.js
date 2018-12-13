const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  if (message.channel.type == 'dm') {
    return message.channel.send("This is Not a right place to use this Command!");
  };

  if (!message.member.roles.some(r=>['Dev', 'Admin'].includes(r.name)) ) 
  return message.channel.send(`Only Admins can use this Command`);

  let member = message.mentions.members.first() || message.guild.members.get(args[0]);

  if (!member) 
  return message.channel.send(`Please mention a valid member of this Server!`);

  if (member == message.guild.members.get(message.author.id)) 
  return message.channel.send("Don't ban yourself Idiot!");
  
  if (member == message.guild.members.get(client.user.id)) 
  return message.channel.send("You can't ban me!");

  if (member.roles.has('513284645274517504')) 
  return message.channel.send("You can't ban a Staff!");
  
  if (member.roles.has('500683658009640975')) 
  return message.channel.send("You can't ban an Admin");
  
  if (member.roles.has('500683949018710036')) 
  return message.channel.send("You can't ban an Admin!");

  if (!member.banable) 
  return message.channel.send("I could not ban this user!");

  let reason = args.slice(1).join('');
  if (!reason) {
    reason = "Not Provided";
  };

  let mod_log_channel = message.guild.channels.find(c => c.name === "mod-log");

  await member.ban(reason)
  .catch(error => message.channel.send(`I could not ban this user! \n ${error}`));

  const embed = new Discord.RichEmbed()
  .setTitle(`${member.user.tag} | ${member.user.id}`)
  .setColor("#d7342a")
  .setTimestamp()
  .addField(`Mod : ${message.author.tag} | ${message.author.id}`, `Reason : ${reason}`)
  .setFooter(`Banned` , message.member.user.displayAvatarURL)

  client.channels.get(mod_log_channel.id).send({embed});
  message.channel.send("Done. User has been Banned <a:hype:515571561345056783>");
}