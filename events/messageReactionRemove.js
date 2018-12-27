const Discord = require('discord.js');

module.exports = (client, reaction, user) => {
  if (user.bot === true) return;

  //console.log(`${user.username} removed his ${reaction.emoji.name} reaction`);

  const reactionMessage = reaction.message;

  let role = reactionMessage.guild.roles.get('500683488538656768')
  let member = reactionMessage.guild.members.get(user.id);
  let reaction_channel = reactionMessage.guild.channels.find(ch => ch.name === "reaction-log");
  if (!reaction_channel) return;

  if (reaction.emoji.id == '509629414120882176') {
    if (reactionMessage.id == '518712940615172096') {
      if (!member.roles.has('500683488538656768'))return;
      member.removeRole(role);

      const embed =  new Discord.RichEmbed()
      .setColor('#f60839')
      .setTitle(`${user.username} | ${user.id}`)
      .setFooter('UNVERIFIED', user.displayAvatarURL)
      .setTimestamp()

      client.channels.get(reaction_channel.id).send({embed});
      member.send(`${member} you removed reaction and lost access of all other channels`);
    }
  }

}