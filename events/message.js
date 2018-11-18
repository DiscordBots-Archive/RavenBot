module.exports = (client, message) => {
  if(message.author.bot) return;
  
  //const prefix = (client.config.prefix);
  const prefix = (process.env.DISCORD_PREFIX);

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${prefix})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (!cmd) return message.channel.send(`Command not found, please do \`${process.env.DISCORD_PREFIX}help\` for options`)

  cmd.run(client, message, args);
};
