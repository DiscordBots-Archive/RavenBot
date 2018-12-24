module.exports = (client, message) => {

  if(message.author.bot) return;
  
  const prefix = (client.config.discord.prefix);

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${prefix})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  /*if (message.channel.type === 'dm') {
    if (message.author.id !== '444432489818357760') return message.channel.send('Please use **Air Hounds - Discord Server** to run this command! :: https://discord.gg/8RTMVFW')
  }
  else if (message.guild.id !== '500004711005683717') {
    if (message.author.id !== '444432489818357760') return message.channel.send('Please use **Air Hounds - Discord Server** to run this command! :: https://discord.gg/8RTMVFW')
  }*/

  if (!cmd) return;

  cmd.run(client, message, args);

};
