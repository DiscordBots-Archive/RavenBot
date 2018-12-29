exports.run = async (client, message, args) => {

    //message.delete(8000)

    const m = await message.channel.send("PING TEST");
    m.edit(`\`Latency ${m.createdTimestamp - message.createdTimestamp}ms\` <a:hype:515571561345056783> \`API Latency ${Math.round(client.ping)}ms\``);

}