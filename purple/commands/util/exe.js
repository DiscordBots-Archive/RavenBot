const { Command } = require('discord-akairo');
const child_process = require('child_process');
class HellCommand extends Command {
    constructor() {
        super('nullo', {
            aliases: ['run'],
            description: {
                content: 'null',
                usage: '<null>',
                examples: ['null']
            },
            category: 'util',
            channel: 'guild',
            ratelimit: 2,

        });
    };

    async exec(message, {query}) {
        let spawn = require('child_process').spawn,
      ls = spawn('start.bat', ['../../../start.bat', 'start.bat']);

    ls.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    ls.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    ls.on('exit', function (code) {
      console.log('child process exited with code ' + code);
    });
    };
};
module.exports = HellCommand;