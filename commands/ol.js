const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    const OLBase = new Discord.Attachment('https://photos.app.goo.gl/rqraPtHkv7mv9dxc6');

    message.channel.send(OLBase);
}