module.exports = (client, guild) => {
    console.log(`Server Removed \nName ${guild.name} \nID: ${guild.id}`);

    const channel = client.channels.find(ch => ch.id === '516098181549916172');
    channel.send(`SERVER REMOVED : ${guild.name} \nSERVER ID : ${guild.id} \nUSERS : ${client.users.size} \nCHANNELS : ${client.channels.size} \nNOW TOTAL SERVERS : ${client.guilds.size}`);

}