module.exports = (client, reaction, user) => {
  console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
  let role
    
  const msg = reaction.message;
  let member = msg.guild.members.get(user.id);
    
  if (msg.id == '518671831482236929') {

    console.log('Valid Message Reaction')
    if (reaction.emoji.id == '509629414120882176') {
      role = msg.guild.roles.get('500683488538656768')
      console.log('Valid Emoji Reaction')
    } 
    member.addRole(role);
  }
}