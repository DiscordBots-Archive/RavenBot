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
    name: 'setprefix',
    type: 'Utils',
    aliases: ['set prefix, change prefix'],
	usage: '[new prefix]',
	description: 'Set your server prefix',
    cooldown: 60,
    args: true,
    guildOnly: true,

	async execute(message, args) {
        
        if (!message.member.roles.some(r=>['Dev', 'Admin'].includes(r.name)) ) 
        return message.channel.send(`Only Admins can use this Command!`);
    
        const prefixName = args[0];
    
        try {
            const prefixvalue = await Prefixes.create({
                name: message.guild.id,
                guild_prefix: prefixName,
            });
            return message.channel.send(`Prefix has been set to **${prefixvalue.guild_prefix}**`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {

                const affectedRows = await Prefixes.update({ guild_prefix: prefixName }, { where: { name: message.guild.id } });
                if (affectedRows > 0) {
                    return message.channel.send(`Prefix has been set to **${prefixName}** <:notlikecat:529505687773118484>`);
                }
            }
            return message.channel.send('Something went wrong with adding a Prefix');
        }
	},
};
