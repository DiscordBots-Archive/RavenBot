const Discord = require('discord.js');

module.exports = (client, reaction, user) => {
  //console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);

  const msg = reaction.message;

  if (msg.id == client.config.reaction.message_id) {

    let role
    let member = msg.guild.members.get(user.id);
  
    console.log('Valid Message Reaction')
    if (reaction.emoji.id == client.config.reaction.emoji_id) {
      role = msg.guild.roles.get(client.config.reaction.react_role)
      console.log('Role Removed')
    } else if (reaction.emoji.id !== client.config.reaction.emoji_id) return;
    
    member.removeRole(role);

    let botcmd = msg.guild.channels.find(ch => ch.name === "bot-spam");

    const embed = new Discord.RichEmbed()
    .setColor("#f32d11")
    .setTimestamp()
    .setDescription(`\`❯ UN-VERIFIED BY REACTING \n• ${user.username} has been un-verified by ${client.user.username}\``)
    client.channels.get(botcmd.id).send({embed});
      
  } else if (msg.id == client.config.reaction.message_id) return;
}