const Discord = require('discord.js');
const fetch = require('node-fetch');
const qs = require('querystring');

module.exports = {
    name: 'src',
	type: 'null',
	usage: ' ',
	description: 'Server Invite Link',
	//cooldown: 600,
	
	async execute(message, args, force) {
        query = args.join(' ');
		let project = 'main';
		let branch = ['stable', 'master', 'rpc', 'commando'].includes(query.slice(-1)[0]) ? query.pop() : 'master';
		if (['rpc', 'commando'].includes(branch)) {
			project = branch;
			branch = 'master';
		}
		const queryString = qs.stringify({ q: args.join(' '), force });
		const res = await fetch(`https://djsdocs.sorta.moe/${project}/${branch}/embed?${queryString}`);
		const embed = await res.json();
		if (!embed) {
			return message.channel.reply("Purple couldn't find the requested information. Maybe look for something that actually exists the next time!");
		}
		if (message.channel.type === 'dm' || !(message.channel).permissionsFor(message.guild.me).has(['ADD_REACTIONS', 'MANAGE_MESSAGES'], false)) {
			return message.util.send({ embed });
		}
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
