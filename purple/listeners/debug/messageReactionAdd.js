const { Listener } = require('discord-akairo');

class ReactionAddListener extends Listener {
	constructor() {
		super('messageReactionAdd', {
			emitter: 'client',
			event: 'messageReactionAdd',
			category: 'client'
		});
	}

	async exec(reaction, user) {

		//console.log(`${user.tag} | ${reaction.emoji.name} | ${reaction.message.id}`)

	}
}
module.exports = ReactionAddListener;