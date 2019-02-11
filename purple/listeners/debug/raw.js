const { Listener } = require('discord-akairo');

class RawListener extends Listener {
	constructor() {
		super('raw', {
			emitter: 'client',
			event: 'raw',
			category: 'client'
		});
	};

	async exec(event) {

        const events = {
            MESSAGE_REACTION_ADD: 'messageReactionAdd',
            MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
        };
            
        if (!events.hasOwnProperty(event.t)) return;
        const { d: data } = event;
        const user = this.client.users.get(data.user_id);
        const channel = this.client.channels.get(data.channel_id) || await user.createDM();
        if (channel.messages.has(data.message_id)) return;
        const message = await channel.messages.fetch(data.message_id);
        const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
        const reaction = message.reactions.get(emojiKey);
        this.client.emit(events[event.t], reaction, user); 
	};
};
module.exports = RawListener;