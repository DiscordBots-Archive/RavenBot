exports.run = async (client, message, args) => {

    if (message.channel.name !== 'bot-commands' & message.channel.type !== 'dm' & message.channel.name !== 'change-log' & message.channel.name !== 'read-me') {
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** channel. Please create it and try again.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`);
    }
    const sayMessage = args.join(" ");
    if (!args.join(" ")) {
        return message.channel.send(`${message.author.username}: ` + "Please provide a message!");
    };
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
}