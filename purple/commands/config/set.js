const { Command } = require('discord-akairo');

class SetCommand extends Command {
    constructor() {
        super('set-cmd', {
            aliases: ['set'],
            description: {
                content: `*Available Methods:*\n` +
                `• modlog \`<channel>\`\n` +
                `• memberlog \`<channel>\`\n` +
                `• guildlog \`<channel>\`\n` +
                `• counting \`<channel>\`\n` +
                `• bot-cmd \`<channel>\`\n` +
                `• mod \`<role>\`\n` +
                `• mute \`<role>\`\n` +
                `• autorole \`<role>\``,
                usage: '<method> <arguments>',
                examples: [
                    'modlog #mod-log',
                    'memberlog #member-log',
                    'guildlog #guild-log',
                    'counting #counting',
                    'bot-cmd #bot-commands',
                    'mod Admin',
                    'mute Muted',
                    'autorole Member'
                ]
            },
            category: 'config',
            channel: 'guild',
            userPermissions: ['MANAGE_GUILD'],
            ratelimit: 2,
            args: [
                {
                    id: 'method',
                    type: ['modlog', 'guildlog', 'counting', 'memberlog', 'mod', 'mute', 'autorole', 'DJ', 'dj']
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
            guildlog: this.handler.modules.get('set-guildlog'),
            counting: this.handler.modules.get('set-counting'),
            memberlog: this.handler.modules.get('set-memberlog'),
            mod: this.handler.modules.get('set-modrole'),
            mute: this.handler.modules.get('set-muterole'),
            autorole: this.handler.modules.get('set-autorole'),
            DJ: this.handler.modules.get('set-dj'),
            dj: this.handler.modules.get('set-dj'),
        })[method];
        return this.handler.handleDirectCommand(message, name, command, true);
    }
}

module.exports = SetCommand;