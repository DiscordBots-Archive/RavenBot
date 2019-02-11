const { Command } = require('discord-akairo');

class SayCommand extends Command {
    constructor() {
        super('say', {
            aliases: ['say'],
            category: 'util',
            description: {
                content: 'Echo your text',
                usage: '<...text>',
                examples: 'Hello World'
            },
            channel: 'guild',
            ratelimit: 2,
            clientPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    id: 'msg',
                    match: 'rest',
                }
            ]
        });
    };

    async exec(message, { msg }) {

        const count = this.client.settings.get(this.client.user.id, 'countChannel', undefined);
        if (count) {
            let channel = this.client.channels.get(count);
            if (message.channel.id === channel.id) {
                return;
            };
        };
        await message.delete().catch(e => {});
        return message.util.send(msg);
    };
};
module.exports = SayCommand;