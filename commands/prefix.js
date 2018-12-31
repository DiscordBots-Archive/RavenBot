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

exports.run = async (client, message, args) => {
    const guild = message.guild.id;
    const tag = await Prefixes.findOne({where: { name: guild } });
    if (tag) {
        return message.channel.send('My prefix is **' + tag.get('guild_prefix') + '**');
    }
    return message.channel.send(`This server has no Prefix`);
}