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
        
        /*function Process() {
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
            
        Process();*/

    };
};
module.exports = HellCommand;
        /*let spawn = require('child_process').spawn;
        let ls = spawn('git.bat', ['../../../git.bat', 'git.bat']);

        ls.stdout.on('data', function(data) {
            return message.channel.send(`\`\`\`stdout\n${data}\`\`\`\``);
        });

        ls.stderr.on('data', function (data) {
            return message.channel.send(`\`\`\`stderr\n${data}\`\`\`\``);
        });

        ls.on('exit', function (code) {
            return message.channel.send(`\`\`\`Process exited with code ${code}\`\`\`\``);
        })*/