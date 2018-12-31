const Discord = require('discord.js');
const Sequelize = require('sequelize');

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

exports.run = async (client, message, args) => {

    if (message.channel.name !== 'bot-commands') {
        message.delete(4000);
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** channel.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`).then(msg => {msg.delete(4000)});
    }

    const guild = message.guild.id;

    const guild_id = await Prefixes.findOne({where: {name : guild}});
  
    if (!guild_id) {
      prefix = '';
      
    } else {
      prefix = guild_id.get('guild_prefix');
    }

    const embed = new Discord.RichEmbed()
    .setColor('#c3fd09')
    .setTitle('COMMAND INFORMATIONS')
    .addField(prefix + 'help', 'It explains itself!')
    .addField(prefix + 'stats', 'It shows statistical info of the bot')
    .addField(prefix + 'server', 'It shows the server info')
    .addField(prefix + 'user @user', 'It shows the user info')
    .addField(prefix + 'ping', 'It show the ping status of the bot')
    .addField(prefix + 'clear [optional @user] [amount]', 'Clear messages from everyone or a particular user')
    .addField(prefix + 'say [Your Text]', 'Get your text from the bot')
    .addField(prefix + 'kick @user [optional reason]', 'Kick a user from the server')
    .addField(prefix + 'ban @user [optional reason]', 'Ban a user from the server')
    .setFooter('Page 1/2', message.author.displayAvatarURL)
    .setTimestamp()

    const embed2 = new Discord.RichEmbed()
    .setColor('#c3fd09')
    .setTitle('COMMAND INFORMATIONS')
    .addField(prefix + 'mute @user [optional reason]', 'Mute a user from all channels')
    .addField(prefix + 'unmute @user', 'Unmute a user from all channels')
    .addField(prefix + 'perms @user [add/remove] [Role Name]', 'A special command, type **' + prefix + 'perms** for more info')
    .addField(prefix + 'player [#player tag]', 'Get your Clash of Clans profile info')
    .addField(prefix + 'clan [#clan tag]', 'Get your Clash of Clans clan info')
    .addField(prefix + 'flag [#playertag]', 'Flag a player and get notification when he/she joins')
    .addField(prefix + 'unflag [#playertag]', 'Unflag a playe who is already flagged')
    .addField(prefix + 'checkplayer [#playertag]', 'Check the player if he\'s flagged or not')
    .addField(prefix + 'checkclan [#clantag]', 'Check if any flagged player exists in your clan')
    .setFooter('Page 2/2', message.author.displayAvatarURL)
    .setTimestamp()

    const embed3 = new Discord.RichEmbed()
    .setTitle('COMMAND INFORMATIONS')
    .setColor('#c3fd09')
    .setTitle('COMMAND INFORMATIONS')
    .addField(prefix + 'help', 'It explains itself!')
    .addField(prefix + 'stats', 'It shows statistical info of the bot')
    .addField(prefix + 'server', 'It shows the server info')
    .addField(prefix + 'user @user', 'It shows the user info')
    .addField(prefix + 'ping', 'It show the ping status of the bot')
    .addField(prefix + 'clear [optional @user] [amount]', 'Clear messages from everyone or a particular user')
    .addField(prefix + 'say [Your Text]', 'Get your text from the bot')
    .addField(prefix + 'kick @user [optional reason]', 'Kick a user from the server')
    .addField(prefix + 'ban @user [optional reason]', 'Ban a user from the server')
    .addField(prefix + 'mute @user [optional reason]', 'Mute a user from all channels')
    .addField(prefix + 'unmute @user', 'Unmute a user from all channels')
    .addField(prefix + 'perms @user [add/remove] [Role Name]', 'A special command, type **' + prefix + 'perms** for more info')
    .addField(prefix + 'player [#player tag]', 'Get your Clash of Clans profile info')
    .addField(prefix + 'clan [#clan tag]', 'Get your Clash of Clans clan info')
    .addField(prefix + 'flag [#playertag]', 'Flag a player and get notification when he/she joins')
    .addField(prefix + 'unflag [#playertag]', 'Unflag a playe who is already flagged')
    .addField(prefix + 'checkplayer [#playertag]', 'Check the player if he\'s flagged or not')
    .addField(prefix + 'checkclan [#clantag]', 'Check if any flagged player exists in your clan')
    .setFooter(client.user.username, client.user.displayAvatarURL)
    .setTimestamp()

    message.channel.send({embed}).then(async message => {
        for(const emotes of ['⬅', '➡']) await message.react(emotes)

        let Emojis = ['⬅', '➡']

        const filter = (reaction, user) => {

            if (user.bot === true) return;
			if (reaction.emoji.name === '➡') {
                reaction.remove(user);
                message.edit({embed : embed2});
            }
            if (reaction.emoji.name === '⬅') {
                reaction.remove(user);
                message.edit({embed : embed});
            }

            return Emojis.includes(reaction.emoji.name);
        };
        message.awaitReactions(filter, {max: 50, time: 60000})
		.then(async collected => {
            message.edit({embed : embed3});
            message.clearReactions()
			//console.log(collected)
		});
    });
}
