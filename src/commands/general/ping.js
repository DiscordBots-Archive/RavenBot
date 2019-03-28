const { Command } = require('discord-akairo');

const RESPONSES = [
	'No...',
	'Not Happening...',
	'Maybe Later...',
	`Pong! \`$(ping)ms\` :: \`$(heartbeat)ms\``,
	`Just you know, I'm not doing this for fun! \`$(ping)ms\` :: \`$(heartbeat)ms\``,
	`Don't think this means anything special! \`$(ping)ms\` :: \`$(heartbeat)ms\``,
	`Can we get on with this already? \`$(ping)ms\` :: \`$(heartbeat)ms\``
];

class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping', 'pong'],
			category: 'general',
			description: { content: `Pings me!` }
		});
	}

	async exec(message) {
		const msg = await message.util.send('Pinging...');

		return message.util.send(
			RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
			.replace('$(ping)', ((msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)).toString())
			.replace('$(heartbeat)', Math.round(this.client.ws.ping).toString())
		);
	}
}

module.exports = PingCommand;