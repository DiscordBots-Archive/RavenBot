
module.exports = {
    name: 'say',
    type: 'Utils',
    aliases: ['announcement'],
	usage: '[text]',
    description: 'An Interesting Command!',
    args: true,
    
	async execute(message, client, args) {
        const sayMessage = args.join(" ");
        if (!args.join(" ")) {
            return;
        };
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
	}
};
