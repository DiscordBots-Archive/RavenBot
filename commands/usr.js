exports.run = (client, message, args) => {
client.guilds.map(g=>g.name).join('\n')
}
