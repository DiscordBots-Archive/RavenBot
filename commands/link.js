exports.run = async (client, message, args) => {

    if (message.guild.id !== '500004711005683717') {

        return message.channel.send(`This command is a Beta command, doesn't work here. Only Available for my Origin Server. Soon it will be Available for Public Server.`);
    }

    if(message.member.id !== '444432489818357760')
    return message.channel.send(`This command is a Beta command, only bot owner can use it. Soon it will be Available for Public.`);

    const sayMessage = args.join(" ");
    if (!args.join(" ")) {
        return message.channel.send(`Please mention a valid user and provide a player tag.`);
    };
    message.delete().catch(O_o=>{}); 
    message.channel.send('SQLite database management system not found');
}