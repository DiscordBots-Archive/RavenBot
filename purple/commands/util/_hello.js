const { Command } = require('discord-akairo');
const moment = require('moment');
const ms = require('ms')

class HelloCommand extends Command {
    constructor() {
        super('hello', {
           //aliases: ['ms'],
           description: {
               conntent: 'Hello Command',
               usage: '[command]'
           },
           category: 'util',
           typing: true,
           ratelimit: 2,
           args: [
            {
                id: 'duration',
                type: str => {
                    if (!str) return null;
                    const duration = ms(str);
                    if (duration && duration >= 300000 && !isNaN(duration)) return duration;
                    return null;
                },
                prompt: {
                    start: (message) => `${message.author}, for how long do you want the mute to last?`,
                    retry: (message) => `${message.author}, please use a proper time format.`
                }
            },
           ]
        });
    }

    async exec(message, {duration}) {
        console.log(duration)
        console.log(new Date(Date.now() + duration))
        message.util.send(`\`${duration}\`\n\`${new Date(Date.now() + duration)}\``)
        console.log(moment('2019-02-05T15:37:33.786Z').format("DD-MM-YY kk:mm:ss"))
    }
}

module.exports = HelloCommand;