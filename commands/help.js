const Discord = require('discord.js');
exports.run = async (client, message, args) => {

    if (message.channel.type === 'dm') return message.channel.send("It doesn't work here!")

    if (message.channel.name !== 'bot-commands') {
        message.delete(4000);
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** channel.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`).then(msg => {msg.delete(4000)});
    }

    const embed = new Discord.RichEmbed()
    .setTitle('COMMAND INFORMATIONS')
    .setColor('#c3fd09')
    .setTitle('COMMAND INFORMATIONS')
    .addField('!help', 'It explains itself!')
    .addField('!stats', 'It shows statistical info of the bot')
    .addField('!server', 'It shows the server info')
    .addField('!user @user', 'It shows the user info')
    .addField('!ping', 'It show the ping status of the bot')
    .addField('!clear [optional @user] [amount]', 'Clear last messages from everyone or a particular user')
    .addField('!say [Your Text]', 'Get your text from the bot')
    .addField('!kick @user [optional reason]', 'Kick a user from the server')
    .addField('!ban @user [optional reason]', 'Ban a user from the server')
    .addField('!mute @user [optional reason]', 'Mute a user from all channels')
    .addField('!unmute @user', 'Unmute a user from all channels')
    .addField('!perms @user [add/remove] [Role Name]', 'A special command, type **!perms** for more info')
    .addField('!player [#player tag]', 'Get your Clash of Clans profile info')
    .addField('!clan [#clan tag]', 'Get your Clash of Clans clan info')
    .addField('!flag #playertag', 'Flag a player and get notification when she/he joins')
    .addField('!unflag #playertag', 'Unflag a player')
    .addField('!checkplayer #playertag', 'Check the player if he/she is flagged or not')
    .addField('!checkclan [#clan tag]', 'If any Flagged player exist in your clan')

    .setFooter(message.author.tag, message.author.displayAvatarURL)
    .setTimestamp()

    message.channel.send({embed})
}