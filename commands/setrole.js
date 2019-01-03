const Discord = require('discord.js');

module.exports = {
    name: 'set-mod',
    type: 'Mod',
    aliases: ['setmod', 'addmod'],
    usage: 'role/id',
    description: 'Set moderator roles',
    example: ['set-mod Staff', 'set-mode 509629260873596930'],
    args: true,
    guildOnly: true,
    adminonly: true,
  
      async execute(message, args, client) {

        let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(r=> r.name === args[0]);
        if (!role) return message.channel.send('Role not found!');
    
        try {
            const data = await Modroles.create({
                name: role.id,
                guild: message.guild.id
            });
            return message.channel.send(`New mod role **${role} (ID: ${data.name})** added <:notlikecat:529505687773118484>`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.channel.send('That Mod Role already exists <:notlikecat:529505687773118484>');

            }
            return message.channel.send('Something went wrong with adding a Mod Role <:notlikecat:529505687773118484>');
        }

    }
}