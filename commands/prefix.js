module.exports = {
  name: 'prefix',
  type: 'Utils',
  usage: ' ',
  aliases: ['my-prefix'],
	description: 'Get my Prefix',
  cooldown: 30,
  guildOnly: true,

	async execute(message, args, client) {
    
    const guild = message.guild.id;
    const tag = await client.Prefixes.findOne({where: { name: guild } });
    if (tag) {
        return message.channel.send("Hello <:meww:523021051202895872>, that's me, my prefix is `" + tag.get('guild_prefix') + '` <:notlikecat:529505687773118484>');
    }
    return message.channel.send(`This server has no Prefix <:notlikecat:529505687773118484>`);
	},
};