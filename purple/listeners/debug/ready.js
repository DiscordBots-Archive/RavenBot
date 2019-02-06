const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const request = require('request-promise');
const moment = require('moment')
const clashconfig = require('../../../auth.json');
const bandconfig = require('../../../auth.json');
const token = clashconfig.clashapi_a;
const token_ = clashconfig.clashapi_;
const bandapi = bandconfig.bandapi;

const TownHallEmoji = {
    2:'<:townhall2:534745498561806357>',
    3:'<:townhall3:534745539510534144>',
    4:'<:townhall4:534745571798286346>',
    5:'<:townhall5:534745574251954176>',
    6:'<:townhall6:534745574738624524>',
    7:'<:townhall7:534745575732805670>',
    8:'<:townhall8:534745576802353152>',
    9:'<:townhall9:534745577033039882>',
    10:'<:townhall10:534745575757709332>',
    11:'<:townhall11:534745577599270923>',
    12:'<:townhall12:534745574981894154>',
}

class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client'
		});
	}

	async exec(message) {

		this.client.logger.info(`[READY] Yawn... Hmph, ${this.client.user.tag} (${this.client.user.id}) is only with you because she's in a good mood!`);
        console.log(`Ready ${this.client.user.tag}`);
        
        const countChannel = this.client.settings.get(this.client.user.id, 'countChannel', undefined);
		if (countChannel) {
			let channel = this.client.channels.get(countChannel);
			channel.messages.fetch(channel.lastMessageID).then(async msg => {
				await this.client.settings.set(channel.id, 'authorID', msg.author.id)
				await this.client.settings.set(channel.id, 'messageContent', msg.content)
			}).catch(error => {})
		}
	}
}
module.exports = ReadyListener;
