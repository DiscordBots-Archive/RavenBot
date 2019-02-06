const { Command } = require('discord-akairo');

class SetCommand extends Command {
    constructor() {
        super('set-cmd', {
           aliases: ['set'],
           description: {
               content: 'Sets the counting channel',
               usage: '<channel>',
               examples: ['#counting', 'count', '5465454654985659']
           },
           category: 'config',
           channel: 'guild',
           userPermissions: ['MANAGE_GUILD'],
           ratelimit: 2,
           args: [
               {
                   id: 'method',
                   type: ['modlog', 'guildlog', 'counting', 'memberlog', 'modrole', 'muterole', 'autorole'],
               },
               {
                   id: 'name',
                   match: 'rest',
                   default: ''
               }
           ]
        });
    }

    async exec(message, { method, name}) {

        if (!method) return;

        const command = ({
            modlog: this.handler.modules.get('set-modlog'),
            guildlog: this.handler.modules.get('set-autorole'),
            counting: this.handler.modules.get('set-counting'),
            memberlog: this.handler.modules.get('set-memberlog'),
            modrole: this.handler.modules.get('set-modrole'),
            muterole: this.handler.modules.get('set-muterole'),
            autorole: this.handler.modules.get('set-aurorole'),
        })[method];
        return this.handler.handleDirectCommand(message, name, command, true);
    }
}

module.exports = SetCommand;