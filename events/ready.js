module.exports = (client) => {
    console.log(`logging In \nClient: ${client.user.tag} \nUsers: ${client.users.size} \nChannels: ${client.channels.size} \nServers: ${client.guilds.size}`);
    client.user.setActivity(`${process.env.DISCORD_PREFIX}help`, {type: "PLAYING"});

/*    const channel = client.channels.find(ch => ch.id === '516098181549916172');
    channel.send(`CLIENT STARTED : ${client.user.tag} \nUSERS : ${client.users.size} \nCHANNELS : ${client.channels.size} \nSERVERS : ${client.guilds.size}`);
 */   
}
