
module.exports = {
    name: 'invite',
    type: 'Utils',
    aliases: [' invite link '],
	usage: '',
	description: 'Ping!',
	cooldown: 60,
	async execute(message) {
        message.channel.send('Permanent link: https://discord.gg/8RTMVFW');
	},
};
