const { Command } = require('discord-akairo');

const RESPONSES = [
	'No.',
	'Not happening.',
	'Maybe later.',
	`:ping_pong: Pong! \`$(ping)ms\` Heartbeat: \`$(heartbeat)ms\``,
	`Just so you know, I'm not doing this for fun! \`$(ping)ms\` Doki doki: \`$(heartbeat)ms\``,
	`Don't think this means anything special! \`$(ping)ms\` Heartbeat: \`$(heartbeat)ms\``,
	`Can we get on with this already?! \`$(ping)ms\` Heartbeat: \`$(heartbeat)ms\``
];

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'],
           category: 'util',
           description: {
               content: 'Checks the bot\'s ping to the Discord server',
           },
		   ratelimit: 2,
		   typing: true,
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