const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();

//const config = require("./config.json");

//client.config = config;
const Telegram   = require('node-telegram-bot-api')
const winston    = require('winston');

//const config = require('./config.json');

const log = winston.createLogger({
  level: process.env.LOG,
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

const tg = new Telegram(process.env.TELEGRAM, { polling: true });
const mentionHook = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

dc.on('message', (message) => {

  // ignore self
  if(message.author.id == client.user.id) return;
  if(message.author.id == mentionHook.id) return;

  log.debug('[discord] [%s-#%s]: <%s#%s> %s',
            message.channel.type, message.channel.name,
            message.author.username, message.author.discriminator,
            message.content
  );

  if (message.channel.type == 'text'
      && message.channel.id == process.env.CHANNEL_ID
      && message.guild.id == process.env.SERVER_ID
  ) {
      // <user#1337> what's up
      let message_out = message.author.username + ' : ' + message.content;
      tg.sendMessage(process.env.TELEGRAM_CHAT, message_out);
  }

});

dc.login(process.env.TOKEN);

tg.on('message', (message) => {
  
  log.debug('[telegram] [%s-#%d]: <%s> %s',
      message.chat.title, message.chat.id,
      message.from.username, message.text
  );

  if (message.chat.id != process.env.TELEGRAM_CHAT) return;

  // <user> what's up
  mentionHook.name = message.from.first_name;
  //let message_out = message.from.first_name + ' : ' + message.text;
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

client.login(process.env.DISCORD_TOKEN);

//client.login(config.token);
