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

    async exec(message) {
        function Process() {
            const process = require('child_process');   
            var ls = process.spawn('start.bat');
            ls.stdout.on('data', function (data) {
              console.log(data);
            });
            ls.stderr.on('data', function (data) {
              console.log(data);
            });
            ls.on('close', function (code) {
                  if (code == 0)
                    console.log('Stop');
                  else
                    console.log('Start');
            });
            };
            
        Process();

    };
};
module.exports = HellCommand;
