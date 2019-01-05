const Discord = require('discord.js');

module.exports = {
    name: 'help',
    type: 'Utils',
    description: 'List all of my commands or info about a specific command',
    aliases: ['commands'],
    usage: '[command name]',
    example: ['help', 'help kick', 'help stats'],
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
            .addField('Look Up', '`' + commands.filter(t => t.type === 'Info').map(c => c.name).join('`, `') + '`')
            .addField('Mod', '`' + commands.filter(t => t.type === 'Mod').map(c => c.name).join('`, `') + '`')
            .addField('Docs', '`' + commands.filter(t => t.type === 'Docs').map(c => c.name).join('`, `') + '`')
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()

            const msg = await message.channel.send({ embed });
            msg.react('🗑');
            let react;
            try {
                react = await msg.awaitReactions(
                    (reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id,
                    { max: 1, time: 10000, errors: ['time'] }
                );
            } catch (error) {
                msg.clearReactions();
    
                return message;
            }
            react.first().message.delete();
    
            return message;

		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return;
        }
        
        const embed = new Discord.RichEmbed()
        .setColor('#9a1ceb')
        .setTitle('Command info about :: ' + command.name)
        if (command.usage) embed.addField('Usage', '`' + `${prefix}${command.name} ${command.usage}` + '`', true)
        if (command.description) embed.addField(`Description`, command.description, true)
        if (command.aliases) embed.addField('Aliases', '`' + prefix + command.aliases.join('`\n`' + prefix) + '`', true)
        if (command.example) embed.addField('Example', '`' + prefix + command.example.join('`\n`' + prefix) + '`', true)
        if (command.cooldown) embed.addField('Cooldown', `${command.cooldown} second(s)`, true)
        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()

        const msg = await message.channel.send({ embed });
		msg.react('🗑');
		let react;
		try {
			react = await msg.awaitReactions(
				(reaction, user) => reaction.emoji.name === '🗑' && user.id === message.author.id,
				{ max: 1, time: 10000, errors: ['time'] }
			);
		} catch (error) {
			msg.clearReactions();

			return message;
		}
		react.first().message.delete();

		return message;

	},
};


/*message.channel.send({embed}).then(async message => {
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
    });*/