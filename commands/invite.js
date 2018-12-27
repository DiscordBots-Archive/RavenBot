exports.run = (client, message, args) => {
    message.delete(2000);
    message.channel.send('Permanent link: https://discord.gg/8RTMVFW');
}