const Discord = require('discord.js');

module.exports = (client, reaction, user) => {
  console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
  let role
    
  const msg = reaction.message;
  let member = msg.guild.members.get(user.id);
      
  if (msg.id == '518671831482236929') {

    console.log('Valid Message Reaction')
    if (reaction.emoji.id == '509629414120882176') {
      role = msg.guild.roles.get('500683488538656768')
      console.log('Valid Emoji Reaction')
    } 
    member.removeRole(role);

    let botcmd = msg.guild.channels.find(ch => ch.name === "bot-spam");

    const embed = new Discord.RichEmbed()
  
    .setColor("#f32d11")
    .setTimestamp()
    .setDescription(`\`❯ UN-VERIFIED BY REACTING \n• ${user.username} has been un-verified by ${client.user.username}\``)

    client.channels.get(botcmd.id).send({embed});

  }
}