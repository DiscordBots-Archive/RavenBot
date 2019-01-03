const Discord = require('discord.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});
module.exports = {
    name: 'removetag',
    type: "Docs",
    aliases: ['deletetag'],
	usage: '[tag name]',
	description: 'Remove a Doc (Tag)',
    args: true,
    guildOnly: true,

	async execute(message, args, client) {
        
        const tagName = args[0];
        const rowCount = await client.Tags.destroy({ where: { name: tagName } });
        if (!rowCount) return message.channel.send('That tag did not exist <:notlikecat:529505687773118484>');
        return message.channel.send(`Docs **${tagName}** has been deleted <:notlikecat:529505687773118484>`);
	},
};
