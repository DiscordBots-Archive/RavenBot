const { Command } = require('discord-akairo');

class GitPullCommand extends Command {
    constructor() {
        super('git-pull', {
            aliases: ['git-pull', 'git-init', 'sync'],
            description: {
                content: 'Download latest code',
            },
            category: 'util',
            channel: 'guild',
            ownerOnly: true,
            ratelimit: 2,
        });
    };

    async exec(message) {

        const { spawn } = require('child_process');
        const bat = spawn('cmd.exe', ['/c', 'git.bat']);

        bat.stdout.on('data', async (data) => {
            console.log(data.toString());
            await message.channel.send(`${data}`, {code: 'js'});
        });

        bat.stderr.on('data', async (data) => {
            console.log(data.toString());
            await message.channel.send(`${data}`, {code: 'js'})
        });

        bat.once('exit', async (code) => {
            await message.channel.send(`${code}`, {code: 'js'});
        });
    };
};
module.exports = GitPullCommand;