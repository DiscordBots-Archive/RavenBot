module.exports = {
    name: 'setprefix',
    type: 'Utils',
    aliases: ['change-prefix'],
	usage: '[new prefix]',
    description: 'Set your server prefix',
    example: ['setprefix !', 'setprefix +'],
    cooldown: 60,
    args: true,
    guildOnly: true,

	async execute(message, args,  client) {
        
        if (!message.member.roles.some(r=>['Dev', 'Admin'].includes(r.name)) ) 
        return message.channel.send(`Only Admins can use this Command!`);
    
        const prefixName = args[0];
    
        try {
            const prefixvalue = await client.Prefixes.create({
                name: message.guild.id,
                guild_prefix: prefixName,
            });
            return message.channel.send(`Prefix has been set to \`${prefixvalue.guild_prefix}\` <:notlikecat:529505687773118484>`);
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {

                const affectedRows = await client.Prefixes.update({ guild_prefix: prefixName }, { where: { name: message.guild.id } });
                if (affectedRows > 0) {
                    return message.channel.send(`Prefix has been set to \`${prefixName}\` <:notlikecat:529505687773118484>`);
                }
            }
            return message.channel.send('Something went wrong with adding a Prefix');
        }
	},
};
