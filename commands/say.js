exports.run = async (client, message, args) => {

    const sayMessage = args.join(" ");
    if (!args.join(" ")) {
        return message.channel.send(`${message.author.username}: ` + "Please provide a message!");
    };
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
}
