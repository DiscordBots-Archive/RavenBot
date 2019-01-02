const Discord = require('discord.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    storage: 'database.sqlite',
});

const Modroles = sequelize.define('roles', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  guild: Sequelize.STRING,
});

module.exports = {
  name: 'mute',
  type: 'Mod',
	usage: '@user/id [optional reason]',
  description: 'Mention a member and mute him',
  example: ['mute @Purple', 'mute @Purple posting ads', 'mute 499250383785558026 posting ads'],
  args: true,
  guildOnly: true,
  adminonly: true,

	async execute(message, args, client) {


    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  
    if (!member) 
    return message.channel.send(`Please mention a valid member of this Server! <:wrong:523020135737458689>`).then(msg => {msg.delete(4000)});
  
    if (member == message.guild.members.get(message.author.id)) 
    return message.channel.send("Don't mute yourself Idiot!");
    
    if (member == message.guild.members.get(client.user.id)) 
    return message.channel.send("Hello <:meww:523021051202895872>, that's me! **I'm not muteable!!!** <:huh:523021014481764352>");

    let reason = args.slice(1).join(' ');

    let mod_log_channel = message.guild.channels.find(c => c.name === "mod-log");
  
    let muteRole = message.guild.roles.find(r => r.name === 'Muted');

    if (member.roles.has(muteRole.id) )
    return message.channel.send(member.user.tag + ' is already muted!') 
  
    //if (member.roles.has(modrole.get('name') ) )
    //return message.channel.send(`You can't mute any <@&` + modrole.get('name') + '>') 

    const user = new Discord.RichEmbed()
    .setTitle(member.user.tag + ' | ' + member.user.id)
    .setFooter('Send yes to confirm', member.user.displayAvatarURL)
    .setTimestamp()

    await message.channel.send(`You sure you want me to mute this user?`, user);
    
		const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 });
    
		if (!responses || responses.size !== 1) {
			return message.channel.send('Timed out. Cancelled mute');
		}

		const response = responses.first();

		let sentMessage;

		if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {

			sentMessage = await message.channel.send(`Muting **${member.user.tag}**...`);

		} else {
			return message.channel.send('Cancelled mute');
    }
  
    const embed = new Discord.RichEmbed()
    .setTitle(`${member.user.tag} | ${member.user.id}`)
    .setColor("#f60839")
    .setTimestamp()
    .addField(`Mod`, message.author.tag)
    if (reason) embed.addField(`Reason`, reason)
    .setFooter(`MUTED`, member.user.displayAvatarURL)

    try {
      await member.send({embed});
    } catch {}

    try {
      await member.addRole(muteRole).then(() => {

        client.channels.get(mod_log_channel.id).send({embed});
        sentMessage.edit(`Successfully muted **${member.user.tag}**`)

        setTimeout ( () => {
          member.removeRole(muteRole);
        }, 3000000);
    
      });
    } catch (error) {
      return sentMessage.edit(`I could not mute **${member.user.tag}**`)
    }

	},
};
