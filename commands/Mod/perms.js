const   Discord = require('discord.js');
module.exports = {
    name: 'perms',
    type: 'Mod',
    aliases: ['set-mod'],
	usage: '@user [role name]',
    description: 'Manage role permissions',
    example: ['perms @Purple add staff', 'perms @Purple remove admin'],
    args: true,
    guildOnly: true,
	adminonly: true,

	async execute(message, args, client) {

        //if (message.member.highestRole.position <=  member.highestRole.position) 
        //return message.channel.send('You know you can\'t do it ' + '<:notlikecat:529505687773118484>');

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return;

        let access = args[1];
        if (!access) return message.channel.send('Please provide an action :: `add / remove`')

        let role = message.guild.roles.get(args[2]) || message.guild.roles.find(r => r.name === args[2]) || message.mentions.roles.first();
        if (!role) return;
    
        if (member == message.guild.members.get(client.user.id))
        return message.channel.send("Hello <:meww:523021051202895872>, that's me! **I'm not roleable!!!** <:huh:523021014481764352>");
    
        let mod_log_channel = message.guild.channels.find(c => c.name === 'mod-log');
        
        const userembed = new Discord.RichEmbed()
        .setTitle(member.user.tag + ' | ' + member.user.id)
        .setFooter('Send yes to confirm', member.user.displayAvatarURL)
        .setTimestamp()
    
        await message.channel.send(`You sure you want me to ${access} ${role} to this user? <:notlikecat:529505687773118484>`, userembed);
    
        const responses = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, { max: 1, time: 10000 });
        
        if (!responses || responses.size !== 1) {
            return message.channel.send('Timed out. Cancelled <:notlikecat:529505687773118484>');
        }

        const response = responses.first();

        let sentMessage;

        if (access === 'add') {
            input = 'Adding role to '
        } else if (access === 'remove') {
            input = 'Removing role from '
        }

        if (/^y(?:e(?:a|s)?)?$/i.test(response.content)) {

            sentMessage = await message.channel.send(`${input} **${member.user.tag}**...`);

        } else {
            return message.channel.send('Cancelled <:notlikecat:529505687773118484>');
        }

        try {
            if (access === 'add') {
                if (member.roles.has(role)) return sentMessage.edit('Successfully added ' + role + ' role to **' + member + '**')

                await member.addRole(role);
                sentMessage.edit('Successfully added ' + role + ' role to **' + member + '**')
            }
        } catch (error) {
            sentMessage.edit('I could not add this role <:notlikecat:529505687773118484>')
        }

        try {
            if (access === 'remove') {
                await member.removeRole(role);
                sentMessage.edit('Successfully removed ' + role + ' role from **' + member + '**')
            }
        } catch (error) {
            sentMessage.edit('I could not Remove this role <:notlikecat:529505687773118484>')
        }

	},
};
