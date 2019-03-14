const request = require('request');
const md5 = require('md5');
const path = require('path');
const qs = require('querystring');
const { Command } = require('discord-akairo');

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
            ]
        })
    }

    async exec(message, { query }) {

        if (message.author.id !== this.client.ownerID) return;
        if (!message.channel.nsfw) return;
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