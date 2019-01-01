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

module.exports = {
    name: 'help',
    type: 'Utils',
    description: 'List all of my commands or info about a specific command',
    aliases: ['commands'],
	usage: '[command name]',
    cooldown: 0,
    //botcmd: true,
    
	async execute(message, args) {

		const { commands } = message.client;

		if (!args.length) {

            const embed = new Discord.RichEmbed()
            .setColor('#9a1ceb')
            .setTitle('Commands')
            .addField('Here\'s a list of all my commands', `For additional info you can send \`${prefix}help [command name]\` to get info on a specific command!`)
            .addField('Utils', '`' + commands.filter(t => t.type === 'Utils').map(c => c.name).join('`, `') + '`')
            .addField('Look Up', '`' + commands.filter(t => t.type === 'Look up').map(c => c.name).join('`, `') + '`')
            .addField('Mod', '`' + commands.filter(t => t.type === 'Mod').map(c => c.name).join('`, `') + '`')
            .addField('Docs', '`' + commands.filter(t => t.type === 'Docs').map(c => c.name).join('`, `') + '`')
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()

            return message.channel.send({embed})

		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return;
        }
        
        const embed = new Discord.RichEmbed()
        .setColor('#9a1ceb')
        .setTitle('Command info about: ' + command.name)
        .addField('Usage', '`' + `${prefix}${command.name} ${command.usage}` + '`', true)
        .addField(`Description`, command.description, true)
        .addField('Aliases', command.aliases.join(', '), true)
        .addField('Cooldown', `${command.cooldown || 3} second(s)`, true)
        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()

		message.channel.send({embed});

	},
};

        /*if (message.channel.name !== 'bot-commands') {
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
        //.setFooter("p", client.user.displayAvatarURL)
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
        });*/
