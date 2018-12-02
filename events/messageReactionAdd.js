const Discord = require('discord.js');

module.exports = (client, reaction, user) => {
  //console.log(`${user.username} reacted with "${reaction.emoji.name}".`);

  const msg = reaction.message;

  if (msg.id == process.env.REACT_MESSAGE) {

    let role
    let member = msg.guild.members.get(user.id);

    console.log('Valid Message Reaction')
    if (reaction.emoji.id == '509629414120882176') {
      role = msg.guild.roles.get('500683488538656768')
      console.log('Role Given')
    } else if (reaction.emoji.id !== '509629414120882176') return;
    
    member.addRole(role);

    let botcmd = msg.guild.channels.find(ch => ch.name === "bot-spam");

    const embed = new Discord.RichEmbed()
    .setColor(65280)
    .setTimestamp()
    .setDescription(`\`❯ VERIFIED BY REACTING \n• ${user.username} has been verified by ${client.user.username}\``)
    client.channels.get(botcmd.id).send({embed})
    
  } else if (msg.id == process.env.REACT_MESSAGE) return;
}