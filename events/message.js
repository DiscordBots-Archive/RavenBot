module.exports = (client, message) => {

  if(message.author.bot) return;
  
  const prefix = (client.config.discord.prefix);

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${prefix})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (!cmd) {
    message.delete(10000);
    return message.channel.send(`Command not found. Please do \`${client.config.discord.prefix}help\` for Options! <:meww:523021051202895872>`).then(msg => {msg.delete(10000)});
  }

  cmd.run(client, message, args);

};
