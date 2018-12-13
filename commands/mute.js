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
  return message.channel.send("Don't mute yourself Idiot!");
  
  if (member == message.guild.members.get(client.user.id)) 
  return message.channel.send("You can't mute me!");

  if (member.roles.has('513284645274517504')) 
  return message.channel.send("You can't mute a Staff!");
  
  if (member.roles.has('500683658009640975')) 
  return message.channel.send("You can't mute an Admin");
  
  if (member.roles.has('500683949018710036')) 
  return message.channel.send("You can't mute an Admin!");

  if (!member.banable) 
  return message.channel.send("I could not mute this user!");

  let reason = args.slice(1).join('');
  if (!reason) {
    reason = "Not Provided";
  };

  let mod_log_channel = message.guild.channels.find(c => c.name === "mod-log");

  let muteRole = message.guild.roles.find(r => r.name === 'Muted');

  const embed = new Discord.RichEmbed()
  .setTitle(`${member.user.tag} | ${member.user.id}`)
  .setColor("#d7342a")
  .setTimestamp()
  .addField(`Mod : ${message.author.tag} | ${message.author.id}`, `Reason : ${reason}`)
  .setFooter(`Muted` , message.member.user.displayAvatarURL)

  member.addRole(muteRole).then(() => {

    client.channels.get(mod_log_channel.id).send({embed});
    message.channel.send("Done. User has been Banned <a:hype:515571561345056783>")
    .catch(error => message.channel.send(`I could not mute this user! \n ${error}`));

    setTimeout ( () => {
        member.removeRole(muteRole);

        /*const embed = new Discord.RichEmbed()
        .setTitle(`${member.user.tag} | ${member.user.id}`)
        .setColor("#d7342a")
        .setTimestamp()
        .addField(`Mod : ${message.author.tag} | ${message.author.id}`, `Reason : ${reason}`)
        .setFooter(`Un-Muted` , message.member.user.displayAvatarURL)*/

    }, 3000000);

  });

}