const Discord = require("discord.js");
const fs = require("fs");
const Sequelize = require('sequelize');
require('dotenv').config();

const client = new Discord.Client();
client.config = require("./config.js");

client.Discord = require('discord.js');

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));

    });
});

client.commands = new Discord.Collection();

/*const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}*/

fs.readdir('./commands/', (err, folders) => {
    if (err) return console.error(err);
    folders.forEach(folder => {
        fs.readdir(`./commands/${folder}/`, (err, files) => {
            if (err) return console.error(err)
            files.forEach(file => {
                if (!file.endsWith('.js')) return;
                let command = require(`./commands/${folder}/${file}`);
                client.commands.set(command.name, command);
            });
        });

    });
});

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    storage: 'database.sqlite',
});

client.Tags = sequelize.define('tags', {
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

client.Prefixes = sequelize.define('prefix', {
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    guild_prefix: Sequelize.TEXT,
});

client.UserHistory = sequelize.define('users', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    guild: Sequelize.STRING,
    userid: Sequelize.STRING,
    username: Sequelize.TEXT,
    avatarurl: Sequelize.TEXT,
    roleid: Sequelize.STRING,
    warnings: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    restrictions: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    mutes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    kicks: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    bans: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

client.once('ready', () => {
    client.Prefixes.sync();
    client.Tags.sync();
    client.UserHistory.sync();
});

client.login(client.config.discord.token);
