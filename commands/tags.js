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
    name: 'tags',
    type: 'Docs',
    aliases: ['all tags'],
	usage: '',
	description: 'List of all tags',
    cooldown: 30,
    guildOnly: true,
    
	async execute(message) {
        const tagList = await Tags.findAll({ attributes: ['name'] });
        const tagString = tagList.map(t => t.name).join('`, `') || 'No tags set';
    
        const embed = new Discord.RichEmbed()
        .setColor('#9a1ceb')
        .setTitle('Docs (Tags)')
        .addField('Command: **docs  <tag>**', '`' + tagString + '`')
        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send({embed});
	},
};