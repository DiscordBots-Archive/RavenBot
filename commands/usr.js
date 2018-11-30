exports.run = (client, message, args) => {
  //return;
message.channel.send(`Servers: ${client.guilds.map(g=>g.name).join('\n')} \nUsers: ${client.users.map(u => u.name).join('\n')}`)
}
