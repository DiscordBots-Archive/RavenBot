
module.exports = {
    name: 'say',
    type: 'Utils',
    aliases: ['announcement'],
	usage: '[text]',
    description: 'An Interesting Command!',
    args: true,
    
	async execute(message, args) {

        const sayMessage = args.slice(0).join(' ')
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
	}
};
