const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const Sequelize = require('sequelize');
require('dotenv').config();

const client = new Discord.Client();
client.config = require("./config.js");

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));

    });
});

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

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


client.guilds.forEach(async guild => {

    guild.members.forEach(async member => {

        const uniquecode = member.user.id + guild.id;

        try {
            const tags = await client.UserHistory.create({
                name: uniquecode,
                guild: guild.id,
                userid: member.user.id,
            });
            return console.log(tags.name)
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return;
            }
            return console.log(e)
        }
    });
});

client.once('ready', () => {
    client.Prefixes.sync();
    client.Tags.sync();
    client.UserHistory.sync();
    //fetchmember();
});

client.login(client.config.discord.token);
