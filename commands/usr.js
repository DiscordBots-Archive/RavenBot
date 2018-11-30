exports.run = (client, message, args) => {
  //return;
message.channel.send(`{client.guilds.map(g=>g.name).join('\n')}`)
}
