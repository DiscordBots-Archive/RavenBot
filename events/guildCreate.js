module.exports = (client, guild) => {
    console.log(`New Server added \nName: ${guild.name} \nID: ${guild.id}`);
    client.user.setActivity(`!help for options`, {type: "WATCHING"});
}