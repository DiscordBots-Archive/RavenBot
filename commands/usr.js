exports.run = (client, message, args) => {
message.channel.send(`{client.guilds.map(g=>g.name).join('\n')}`)
}
