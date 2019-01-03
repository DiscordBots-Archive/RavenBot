const Discord = require('discord.js');
const fetch = require('node-fetch');
const qs = require('querystring');
const rp = require('request-promise');
const $ = require('cheerio');

module.exports = {
    name: 'plyr',
	type: 'Utils',
	usage: ' ',
    description: 'Server Invite Link',
    args: true,
	//cooldown: 600,
	
	async execute(message, args) {
        const player = args.join(' ');
        input = player.toUpperCase().replace(/#/g, '').replace(/O/g, '0')
        const url = 'http://kuilin.net/cc_n/member.php?tag=' + input;
        rp(url)
            .then(function(html) {
                console.log($('property', html).text());
                console.log($('span#top', html).find('b', html).text());
                const embed = new Discord.RichEmbed()
                .addField('test', $('span#top', html).text())
                message.channel.send({embed})
            })
            .catch(function(err) {
            //handle error
        });
        


	},
};
