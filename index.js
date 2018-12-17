const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
require('dotenv').config();

const client = new Discord.Client();
client.config = require("./config.js");


/*const Telegram   = require('node-telegram-bot-api')
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

var rp               = require('request-promise');
var config           = require('./clash_api.js');
var memberDonateList = [];
var textChannels = [];
var timers = [];
var options = [];
var errorCount = 0;

var DEBUG = false;


var leagueStrings = [
    "<:Unranked:293677521503911936>",
    "<:Bronze:293677521222762507>",
    "<:Bronze:293677521222762507>",
    "<:Bronze:293677521222762507>",
    "<:Silver:293677521642192896>",
    "<:Silver:293677521642192896>",
    "<:Silver:293677521642192896>",
    "<:Gold:293677521080418307>",
    "<:Gold:293677521080418307>",
    "<:Gold:293677521080418307>",
    "<:Crystal:293677521139007488>",
    "<:Crystal:293677521139007488>",
    "<:Crystal:293677521139007488>",
    "<:Master:293677521034018816>",
    "<:Master:293677521034018816>",
    "<:Master:293677521034018816>",
    "<:Champion:293688636992520193>",
    "<:Champion:293688636992520193>",
    "<:Champion:293688636992520193>",
    "<:Titan:293677520480370690>",
    "<:Titan:293677520480370690>",
    "<:Titan:293677520480370690>",
    "<:Legend:293677520497147905>",
    "<:Legend:293677520497147905>",
    "<:Legend:293677520497147905>",
    "<:Legend:293677520497147905>"
];

function debug( msg ) {
    if (DEBUG) console.log(msg);
}

function getLeagueFromID( id ) {
    if (id < 29000000) id = 29000000;
    if (id > 29000024) id = 29000024;
    return leagueStrings[id - 29000000];
}


//Timer function, Updates memberlist info and logs changes to discord and console
function timerUpdate( index ) {
    clearTimeout(timers[index]);
    rp(options[index])
    .then(clan => {
        var curDate = new Date();
        debug("Bot active at " + curDate.toLocaleTimeString());
        if (errorCount > 0) {
            debug("Bot is online.");
            errorCount = 0;
        }
        // Build donation message
        var donatedMsg = "";
        var receivedMsg = "";
        debug(" Clan size: " + clan.members);
        for (var i = 0; i < clan.members; i++) {
            var player = clan.memberList[i];
            if (player.tag in memberDonateList[index]) {
                var league = "";
                if (config.showLeague) league = getLeagueFromID(player.league.id)  + " " ;
                var diffDonations = player.donations - memberDonateList[index][player.tag].donations;
                if (diffDonations) {
                    donatedMsg += league + player.name + " (" + player.tag + ") : " + diffDonations + "\n";
                }
                var diffReceived = player.donationsReceived - memberDonateList[index][player.tag].donationsReceived;
                if (diffReceived) {
                    receivedMsg += league + player.name + " (" + player.tag + ") : " + diffReceived + "\n";
                }
            }
        }
        //Send Message if any donations exist
        if (donatedMsg!="" || receivedMsg!="") {
            if (config.useRichEmbed) {
                const embedObj = new Discord.RichEmbed()
                    .setColor(config.clans[index].color)
                    .addField('Donated troops or spells:',donatedMsg, false)
                    .addField('Recieved troops or spells:', receivedMsg, false)
                    .setFooter(curDate.toUTCString());
                textChannels[index].send(embedObj);
            } else {
                textChannels[index].send(
                    '**Donated troops or spells:**\n' +
                    donatedMsg +
                    '**Recieved troops or spells:**\n' + 
                    receivedMsg + 
                    "*" + curDate.toUTCString() + "*\n\n");
            }
        }
        //Update member list data(purges members that have left)
        memberDonateList[index] = [];
        for (var i = 0; i < clan.members; i++) {
            var player = clan.memberList[i];
            memberDonateList[index][player.tag] = player;
        }
        //set timer again
        timers[index] = setTimeout(timerUpdate, config.timeDelay * 1000, index);
    })
    .catch(err => {
        textChannels[index].send("Something went wrong!!! \n ``` \n" + err.reason + " \n " + err.message + " \n ```");
        debug(err.message);
        errorCount++;
        if (errorCount > 30) {
            debug("Bot could not recover");
            errorCount = 30;
        }
        timers[index] = setTimeout(timerUpdate, config.timeDelay * 1000 * errorCount, index); // progressively lengthens
    });
}


client.on('ready', () => {
    debug("ready");
    errorCount = 0;
    timers = new Array(config.clans.length);
    textChannels = new Array(config.clans.length);
    options = new Array(config.clans.length);
    memberDonateList = new Array(config.clans.length);
    for(var i = 0; i < config.clans.length; i++ ) {
        debug(config.clans[i]);
        if (client.channels.has(config.clans[i].channelID)) {
            textChannels[i] = client.channels.get(config.clans[i].channelID);
            options[i] = {
                'uri': 'https://api.clashofclans.com/v1/clans/' + config.clans[i].tag.toUpperCase().replace(/O/g, '0').replace(/#/g, '%23'),
                'method': 'GET',
                'headers': {
                    'Accept': 'application/json',
                    'authorization': 'Bearer ' + config.apiKey,
                    'Cache-Control':'no-cache'
                },
                'proxy': process.env.FIXIE_URL,
                'json': true
            };
            debug(options[i].uri);
            memberDonateList[i] = [];
            textChannels[i].send("Logging Started!\n");
            timerUpdate(i);
        } else {
            debug("Error: Channel (" + config.clans[i].channelID + ") Not found!");
        }
    }
});

debug(config.apiKey);*/


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
