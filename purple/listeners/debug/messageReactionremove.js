const { Listener } = require('discord-akairo');

class ReactionAddListener extends Listener {
	constructor() {
		super('messageReactionRemove', {
			emitter: 'client',
			event: 'messageReactionRemove',
			category: 'client'
		});
	}

	async exec(reaction, user) {

		//console.log(`${user.tag} | ${reaction.emoji.name} | ${reaction.message.id}`)
        
	}
}
module.exports = ReactionAddListener;