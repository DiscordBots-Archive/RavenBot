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

    const prefixName = args.join(' ');

    try {
        const prefixvalue = await Prefixes.create({
            name: message.guild.id,
            guild_prefix: prefixName,
        });
        return message.channel.send(`Prefix has been set to ${prefixvalue.guild_prefix}`);
    }
    catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            return message.channel.send('That prefix already exists');
        }
        return message.channel.send('Something went wrong with adding a prefix');
    }
}