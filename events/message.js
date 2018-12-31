const Sequelize = require('sequelize');

const prefixlize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  operatorsAliases: false,
  storage: 'prefix.sqlite',
});

const Prefixes = prefixlize.define('prefix', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  guild_prefix: Sequelize.TEXT,
});

module.exports = async (client, message) => {

  if (message.channel.type == 'dm') return;

  if (message.author.bot) return;

  const guild = message.guild.id;

  const guild_id = await Prefixes.findOne({where: {name : guild}});

  if (!guild_id) {
    //prefix = (client.config.discord.prefix);
    prefix = null;
    
  } else {
    prefix = guild_id.get('guild_prefix');
  }

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${prefix})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (message.guild.id !== '500004711005683717') {
    if (message.author.id !== '444432489818357760') return; //message.channel.send('Please use **Air Hounds - Discord Server** to run this command! :: https://discord.gg/8RTMVFW')
  }

  if (!cmd) return;

  cmd.run(client, message, args);

};
