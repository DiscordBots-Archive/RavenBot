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

module.exports = {
  name: 'prefix',
  type: 'Utils',
  aliases: ['prefix'],
	usage: '',
	description: 'Get my Prefix',
  cooldown: 30,
  guildOnly: true,

	async execute(message, client, args) {
    const guild = message.guild.id;
    const tag = await Prefixes.findOne({where: { name: guild } });
    if (tag) {
        return message.channel.send("Hello <:meww:523021051202895872>, that's me, my prefix is `" + tag.get('guild_prefix') + '` <:notlikecat:529505687773118484>');
    }
    return message.channel.send(`This server has no Prefix`);
	},
};