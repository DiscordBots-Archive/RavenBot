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
    name: 'addtag',
    type: 'Docs',
    aliases: ['add tag, add docs'],
	usage: '[tag name] [data]',
    description: 'Store docs type data',
    args: true,
    guildOnly: true,
    
	async execute(message, args) {
        const tagName = args[0];
        const tagDescription = args.slice(1).join(' ');
    
        try {
            const tag = await Tags.create({
                name: tagName,
                description: tagDescription,
                username: message.author.username,
            });
            return message.channel.send(`New docs **${tag.name}** added <:notlikecat:529505687773118484>`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.channel.send('That tag already exists <:notlikecat:529505687773118484>');
            }
            return message.channel.send('Something went wrong with adding a tag <:notlikecat:529505687773118484>');
        }
	},
};
