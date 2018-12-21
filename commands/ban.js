const Discord = require('discord.js');

exports.run = async (client, message, args) => {

  if (message.channel.type == 'dm') {
    return message.channel.send("This is Not a right place to use this Command!");
  };

  if (message.guild.id !== '500004711005683717') return message.channel.send(`This command works for **Air Hounds - Discord Server** Only <:right:509629414120882176>` + `\n` + `https://discord.gg/8RTMVFW`);

  if (!message.member.roles.get('500700090181222400') && !message.member.roles.get('500683949018710036')) {
    message.delete(4000)
    return message.channel.send(`Only <@&500683949018710036> can use this Command!`).then(msg => {msg.delete(4000)});
  }

  let member = message.mentions.members.first() || message.guild.members.get(args[0]);

  if (!member) 
  return message.channel.send(`Please mention a valid member of this Server! <:wrong:523020135737458689>`).then(msg => {msg.delete(4000)});

  if (member == message.guild.members.get(message.author.id)) 
  return message.channel.send("Don't ban yourself Idiot!");
  
  if (member == message.guild.members.get(client.user.id)) 
  return message.channel.send("Hello <:meww:523021051202895872>, that's me! **I'm not banable!!!** <:huh:523021014481764352>");

  if (member.roles.has('513284645274517504')) 
  return message.channel.send("You can't mute a <@&513284645274517504>!"); // staff

  if (member.roles.has('525375822391934997')) 
  return message.channel.send("You can't mute a <@&525375822391934997>!"); // ah staff
  
  if (member.roles.has('500683658009640975')) 
  return message.channel.send("You can't mute a <@&500683658009640975>!"); // mod
  
  if (member.roles.has('500683949018710036')) 
  return message.channel.send("You can't mute an <@&500683949018710036>!"); // admin

  if (!member.banable) 
  return message.channel.send("I could not ban this user!");

  let reason = args.slice(1).join(' ');
  if (!reason) {
    reason = "Not Provided";
  };

  let mod_log_channel = message.guild.channels.find(c => c.name === "mod-log");

  await member.ban(reason)
  .catch(error => message.channel.send(`I could not ban this user! \n ${error}`));

  const embed = new Discord.RichEmbed()
  .setTitle(`${member.user.tag} | ${member.user.id}`)
  .setColor("#f60839")
  .setTimestamp()
  .addField(`\`MOD: ${message.author.tag}\``, `\`REASON: ${reason}\``)
  .setFooter(`BANNED`, member.user.displayAvatarURL)

  client.channels.get(mod_log_channel.id).send({embed});
  message.channel.send("Done. User has been Banned <a:hype:515571561345056783>");
}