const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  operatorsAliases: false,
  storage: 'database.sqlite',
});

const Prefixes = sequelize.define('prefix', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  guild_prefix: Sequelize.TEXT,
});

module.exports = {
  name: 'prefix',
  type: 'Utils',
  usage: ' ',
  aliases: ['my-prefix'],
	description: 'Get my Prefix',
  cooldown: 30,
  guildOnly: true,

	async execute(message) {
    
    const guild = message.guild.id;
    const tag = await Prefixes.findOne({where: { name: guild } });
    if (tag) {
        return message.channel.send("Hello <:meww:523021051202895872>, that's me, my prefix is `" + tag.get('guild_prefix') + '` <:notlikecat:529505687773118484>');
    }
    return message.channel.send(`This server has no Prefix`);
	},
};