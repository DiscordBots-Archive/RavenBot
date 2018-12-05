const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
require('dotenv').config();

const client = new Discord.Client();
client.config = require("./config.js");


const Telegram   = require('node-telegram-bot-api')
const winston    = require('winston');
const log = winston.createLogger({
    level: client.config.telegram.log,
    transports: [
        new winston.transports.File({
            filename: 'logs/bridge.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.splat(),
                winston.format.json()
            )
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.splat(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

const tg = new Telegram(client.config.telegram.token, { polling: true });

const mentionHook = new Discord.WebhookClient(client.config.webhooks.id, client.config.webhooks.token);

client.on('message', (message) => {

    // ignore self
    if(message.author.id == client.user.id) return;
    if(message.author.id == mentionHook.id) return;

    log.debug('[discord] [%s-#%s]: <%s#%s> %s',
              message.channel.type, message.channel.name,
              message.author.username, message.author.discriminator,
              message.content
    );

    if (message.channel.type == 'text'
        && message.channel.id == client.config.webhooks.channel_id
        && message.guild.id == client.config.webhooks.guild_id
    ) {
        // <user#1337> what's up
        let message_out = message.author.username + '\n' + message.content;
        tg.sendMessage(client.config.telegram.chat_id, message_out);
    }

});

tg.on('message', (message) => {
    
    log.debug('[telegram] [%s-#%d]: <%s> %s',
        message.chat.title, message.chat.id,
        message.from.username, message.text
    );

    if (message.chat.id != client.config.telegram.chat_id) return;

    // <user> what's up
    mentionHook.name = message.from.first_name;
    let message_out = message.text;
    mentionHook.send(message_out);

});


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    //console.log(`loading event: ${eventName}`)
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    //console.log(`loading command: ${process.env.DISCORD_PREFIX}${commandName}`);
    client.commands.set(commandName, props);
  });
});


client.login(client.config.discord.token);
