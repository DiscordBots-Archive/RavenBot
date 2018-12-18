const Discord = require('discord.js');

module.exports = (client, reaction, user) => {

  //console.log(`${user.username} removed his ${reaction.emoji.name} reaction`);

  const reactionMessage = reaction.message;

  let role = reactionMessage.guild.roles.get('500683488538656768')
  let member = reactionMessage.guild.members.get(user.id);
  let reaction_channel = reactionMessage.guild.channels.find(ch => ch.name === "reaction-log");

  if (reactionMessage.id = '518712940615172096') {

    //console.log('Valid Message Reaction');

    if (reaction.emoji.id == '509629414120882176') {

      //console.log(`Valid Emoji Reaction`);

      member.removeRole(role);

      const embed = new Discord.RichEmbed()
      .setColor("#f32d11")
      .setTimestamp()
      .setFooter(`UNVERIFIED`, user.displayAvatarURL)
      .setTitle(`${user.username} | ${user.id}`)

      client.channels.get(reaction_channel.id).send({embed});

      member.send(`${member} you removed reaction and lost Verified Role!!`);

    } else if (reaction.emoji.id !== '509629414120882176') return;

  } else if (reactionMessage.id !== '518712940615172096') return;
}