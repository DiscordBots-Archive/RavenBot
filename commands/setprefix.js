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
    
    if (!message.member.roles.get('500700090181222400') && !message.member.roles.get('500683949018710036')) {
        //message.delete(4000)
        return message.channel.send(`Only <@&500683949018710036> can use this Command!`).then(msg => {msg.delete(4000)});
    };

    const prefixName = args.join(' ');

    try {
        const prefixvalue = await Prefixes.create({
            name: message.guild.id,
            guild_prefix: prefixName,
        });
        return message.channel.send(`Prefix has been set to **${prefixvalue.guild_prefix}**`);
    }
    catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            //return message.channel.send('That prefix already exists');
            const affectedRows = await Prefixes.update({ guild_prefix: prefixName }, { where: { name: message.guild.id } });
            if (affectedRows > 0) {
                return message.channel.send(`Prefix has been set to **${prefixName}**`);
            }
        }
        return message.channel.send('Something went wrong with adding a Prefix');
    }
}