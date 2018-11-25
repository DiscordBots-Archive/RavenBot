module.exports = (client, guild) => {
    console.log(`New Server added \nName: ${guild.name} \nID: ${guild.id}`);

    /*const channel = client.channels.find(ch => ch.id === '516098181549916172');
    channel.send(`SERVER ADDED : ${guild.name} \nSERVER ID : ${guild.id} \nUSERS : ${client.users.size} \nCHANNELS : ${client.channels.size} \nNOW TOTAL SERVERS : ${client.guilds.size}`);
*/
}