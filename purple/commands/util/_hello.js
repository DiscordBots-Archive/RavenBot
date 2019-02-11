const { Command } = require('discord-akairo');

class HelloCommand extends Command {
    constructor() {
        super('null', {
            //aliases: ['null'],
            description: {
                content: 'null',
                usage: '<null>',
                examples: ['null']
            },
            category: 'util',
            channel: 'guild',
            ratelimit: 2,
            args: [
                {
                    id: 'query',
                    match: 'rest'
                }
            ]
        });
    }

    async exec(message, {query}) {
        const connection = await this.client.channels.get('544379786605363200').join();
        connection.play(ytdl(query, { quality: 'highestaudio' }));
    };
};
module.exports = HelloCommand;