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
    name: 'docs',
    type: 'Docs',
    aliases: ['tags, docs'],
	usage: '[tag name]',
    description: 'Get the content of any tag from database',
    args: true,
    guildOnly: true,

	async execute(message, args) {
        const tagName = args[0];
        const tag = await Tags.findOne({where: { name: tagName } });
        if (tag) {
            tag.increment('usage_count');
            return message.channel.send(tag.get('description'));
        }
        return; //message.channel.send(`Could not find tag + tagName);
	},
};
