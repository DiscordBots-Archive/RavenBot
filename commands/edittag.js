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
    name: 'edittag',
    type: 'Docs',
    aliases: ['edit tags'],
	usage: '[ tag name ] [ new data ]',
    description: 'Add some more new content',
    
	async execute(message, args) {
        const tagName = args[0];
        const tagDescription = args.slice(1).join(' ');
    
        const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
        if (affectedRows > 0) {
            return message.channel.send(`Docs **${tagName}** has been edited <:notlikecat:529505687773118484>`);
        }
        return; //message.channel.send(`Could not find any docs with name **${tagName}**`);
	},
};
