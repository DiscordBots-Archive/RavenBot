const Discord = require('discord.js');
const fetch = require('node-fetch');
const qs = require('querystring');
const moment = require('moment');
const duration = require('moment-duration-format');

module.exports = {
    name: 'npm',
	type: 'null',
	usage: ' ',
	description: 'Server Invite Link',
	//cooldown: 600,
	
	async execute(message, args) {
        let pkg = args.join(' ')
        const res = await fetch(`https://registry.npmjs.com/${pkg}`);
		if (res.status === 404) {
			return message.channel.reply("Yukikaze couldn't find the requested information. Maybe look for something that actually exists the next time!");
		}
		const body = await res.json();
		if (body.time.unpublished) {
			return message.channel.reply('whoever was the Commander of this package decided to unpublish it, what a fool.');
		}
		const version = body.versions[body['dist-tags'].latest];
		//const maintainers = this._trimArray(body.maintainers.map(user => user.name));
		//const dependencies = version.dependencies ? this._trimArray(Object.keys(version.dependencies)) : null;
		const embed = new Discord.RichEmbed()
			.setColor(0xCB0000)
			.setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
			.setTitle(body.name)
			.setURL(`https://www.npmjs.com/package/${pkg}`)
			.setDescription(body.description || 'No description.')
			.addField('❯ Version', body['dist-tags'].latest, true)
			.addField('❯ License', body.license || 'None', true)
			.addField('❯ Author', body.author ? body.author.name : '???', true)
			.addField('❯ Creation Date', moment.utc(body.time.created).format('YYYY/MM/DD hh:mm:ss'), true)
			.addField('❯ Modification Date', moment.utc(body.time.modified).format('YYYY/MM/DD hh:mm:ss'), true)
			.addField('❯ Main File', version.main || 'index.js', true)
			//.addField('❯ Dependencies', dependencies && dependencies.length ? dependencies.join(', ') : 'None')
            //.addField('❯ Maintainers', maintainers.join('; '));
            

		return message.channel.send(embed);
	}

};
