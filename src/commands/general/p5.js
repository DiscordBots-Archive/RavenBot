const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const request = require('request');
const path = require('path');

class NSFWCommand extends Command {
    constructor() {
        super('nsfw', {
            aliases: ['nsfw'],
            category: 'nsfw',
            args: [
                {
                    id: 'query',
                    match: 'content',
                    default: 'BigBoobsGW'
                }
            ],
            description: {
                content: 'Displays random boobs, uh!'
            }
        })
    }

    async exec(message, { query }) {

        if (message.channel.id !== '555369247161843712') {
            const att = new MessageEmbed().setImage('https://images-ext-1.discordapp.net/external/oh9rSfiKmoYaO46eXnDWDHCtMJOq9Ug6mfkL3p9y1vw/%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjYxMjYwfQ/https/images.unsplash.com/photo-1471871480126-59ab253c49e9?width=799&height=533');
            return message.channel.send(att);
        }
        try {
            const url = "http://reddit.com/r/" + query + ".json?limit=100";
            request.get(url, (err, response) => {
                if (!err) {
                    const body = JSON.parse(response.body)
                    const validImageExtensions = ['.jpg', '.jpeg', '.gif', '.png']
                    let results = []
                    body.data.children.forEach(child => {
                        let imageUrl = child.data.url
                        let imageThumbnailUrl = child.data.thumbnail
                        if (imageUrl && !imageUrl.match("\/gallery\/|\/album\/|\/new\/|\/a\/|m.imgur.com\/") && imageThumbnailUrl && imageUrl.length > 1 && imageThumbnailUrl.length > 1) {
                            imageUrl = imageUrl.replace(/ /g,'')
                            imageThumbnailUrl = imageThumbnailUrl.replace(/ /g,'')
                            imageUrl = imageUrl.replace('.gifv', '.gif')
                            let imageThumbnailExtension = path.extname(imageThumbnailUrl)
                            let imageExtension = path.extname(imageUrl)
                            if (validImageExtensions.includes(imageThumbnailExtension)) {
                                const filename = imageUrl.replace(imageExtension, '')
                                if (!validImageExtensions.includes(imageExtension) && imageUrl.indexOf("imgur") > -1) {
                                    imageExtension = imageThumbnailExtension
                                }
                                const childUrl = filename + imageExtension
                                if (validImageExtensions.includes(imageExtension)) {
                                    results = [...results, {
                                        url: childUrl,
                                    }]
                                }
                            }
                        }
                    })
    
                    try {
                        const img = results[Math.floor(Math.random() * results.length)].url;
                        const embed = this.client.util.embed().setImage(img);
                        return message.util.send(embed);
                    } catch {}
                }
            }).catch(err => {});
        } catch {}
    }
}

module.exports = NSFWCommand;