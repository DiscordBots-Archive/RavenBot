const Discord = require('discord.js');

module.exports = (client, reaction, user) => {
  if (user.bot === true) return;

  //console.log(`${user.username} reacted with ${reaction.emoji.name} reaction`);

  const reactionMessage = reaction.message;

  let role = reactionMessage.guild.roles.get('500683488538656768')
  let member = reactionMessage.guild.members.get(user.id);
  let reaction_channel = reactionMessage.guild.channels.find(ch => ch.name === "reaction-log");
  if (!reaction_channel) return;

  if (reactionMessage.id = '518712940615172096') {

    //console.log('Valid Message Reaction');

    if (reaction.emoji.id == '509629414120882176') {

      //console.log(`Valid Emoji Reaction`);

      if (member.roles.has('500683488538656768')) return;

      member.addRole(role);

      const embed = new Discord.RichEmbed()
      .setColor('#08f885')
      .setTimestamp()
      .setFooter(`VERIFIED`, user.displayAvatarURL)
      .setTitle(`${user.username} | ${user.id}`)

      client.channels.get(reaction_channel.id).send({embed});

      member.send(`${member} you are verified, so now you can access other channels.`);
      
    } else if (reaction.emoji.id !== '509629414120882176') return;

  } else if (reactionMessage.id !== '518712940615172096') return;
}
