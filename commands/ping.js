exports.run = async (client, message, args) => {

    if (message.channel.name !== 'bot-commands' & message.channel.type !== 'dm') {
        let channel = message.guild.channels.find(ch => ch.name === "bot-commands");
        if(!channel) return message.channel.send('Could not found **#bot-commands** channel. Please create it and try again.')
        return message.channel.send(`Please use commands in appropriate chatrooms to reduce spam ${channel}`);
    }
    const m = await message.channel.send("PING TEST");
    m.edit(`Latency ${m.createdTimestamp - message.createdTimestamp}ms <a:hype:515571561345056783> API Latency ${Math.round(client.ping)}ms`);

}