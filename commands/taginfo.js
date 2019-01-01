const Discord = require('discord.js');
const Sequelize = require('sequelize');
const moment = require('moment');

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
    name: 'taginfo',
    type: 'Docs',
    aliases: ['tag info'],
	usage: '[ tag name ]',
	description: 'Raw Info about a tag',
    cooldown: 30,
    args: true,
    guildOnly: true,
    
	async execute(message, args) {
        const tagName = args[0];
        const tag = await Tags.findOne({ where: { name: tagName } });
    
        if (tag) {
    
            const embed = new Discord.RichEmbed()
            .setColor('#9a1ceb')
            .setTitle(tagName)
            .addField('Creator : ' + tag.username, 'Date : ' + moment(tag.createdAt).format("DD-MM-YY kk:mm"))
            .setFooter(tag.usage_count + ' times used')
            .setTimestamp()
    
            return message.channel.send({embed})
    
        }
        return message.channel.send(`Could not find **${tagName}**`);
	},
};
