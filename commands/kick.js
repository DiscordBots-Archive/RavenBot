const Discord = require('discord.js');
exports.run = async (client, message, args) => {

  if(message.channel.type == 'dm') return message.channel.send('`Not a right place to use this command`')

  if(!message.member.roles.some(r=>[process.env.DEV_ROLE, process.env.ADM_ROLE].includes(r.name)) )
  return message.channel.send(`${message.author.username} ` + ` you don't have the role to use this, missing **${process.env.ADM_ROLE}** role, please create them and try again.`);

  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  let botcmd = message.guild.channels.find(ch => ch.name === "bot-spam");
  if (!botcmd) return message.channel.send('Could not found **#bot-spam** channel. Please create it and try again.')

  if(!member)
  return message.channel.send(`**${message.author.username}**: ` + "Please mention a valid member of this server!");

  if(!member.kickable) 
  return message.channel.send(`**${message.author.username}**: ` + "I cannot kick this user: `Missing Permission or Role Order`");

  let reason = args.slice(1).join(' ');

  if(!reason) reason = "No reason provided";

  await member.kick(reason)

  .catch(error => message.channel.send(`**${message.author.username}**: ` + `Sorry, I couldn't kick because of : ${error}`));

  const embed = new Discord.RichEmbed()

  .setColor("#f32d11")
  .setTimestamp()
  .setDescription(`\`❯ USER KICKED \n• ${member.user.username} has been kicked by ${message.author.username} \n• Reason : ${reason}\``)

  client.channels.get(botcmd.id).send({embed});
  message.channel.send("Ok Bro");
}
