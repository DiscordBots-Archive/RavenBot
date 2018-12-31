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
        //console.log(`Loading Events : ${eventName}`);
        client.on(eventName, event.bind(null, client));

    });
});

client.commands = new Enmap();

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        //console.log(`Loading Commands : ${client.config.discord.prefix}${commandName}`);
        client.commands.set(commandName, props);

    });
});

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

client.once('ready', () => {
    Prefixes.sync();
});

client.login(client.config.discord.token);
