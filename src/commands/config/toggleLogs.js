const { Command, Control } = require('discord-akairo');
const ReactionRole = require('../../models/ReactionRoles');

class ToggleLogsCommand extends Command {
	constructor() {
		super('toggle-logs', {
			aliases: ['toggle-log', 'toggle-logs', 'disable'],
			category: 'config',
			channel: 'guild',
			userPermissions: ['MANAGE_GUILD'],
            ratelimit: 2,
            flags: ['--memberlog', '--member', '--mod', '--modlog', '--logs', '--guildlog', '--reaction', '--reactionrole'],
			description: { content: 'Toggle logs features on the server.' }
		});
    }
    
    async *args() {
        const memberlog = yield {
            match: 'flag',
            flag: ['--memberlog', '--member']
        };
        const modlog = yield {
            match: 'flag',
            flag: ['--mod', '--modlog']
        };
        const guildlog = yield {
            match: 'flag',
            flag: ['--logs', '--guildlog']
        };
        const reaction = yield {
            match: 'flag',
            flag: ['--reaction', '--reactionrole']
        };
        const msg = yield (
            reaction ? 
            {
                match: 'rest',
                type: 'reactionRole',
                prompt: {
                    start: 'what is the message id?',
                    retry: 'message id not found.'
                }
            }:
            {
                type: (msg, phrase) => false
            }
        )
        return { memberlog, modlog, reaction, guildlog, msg };
    }

	async exec(message, { memberlog, modlog, guildlog, reaction, msg }) {
        if (memberlog) {
            this.client.settings.delete(message.guild, 'memberLog');
            return message.util.reply(`successfully disabled member log channel.`);
        }

        if (modlog) {
            this.client.settings.delete(message.guild, 'modLogChannel');
            return message.util.reply(`successfully disabled mod log channel.`);
        }

        if (guildlog) {
            this.client.settings.delete(message.guild, 'guildLog');
            return message.util.reply(`successfully disabled guild log channel.`);
        }

        if (reaction) {
            await ReactionRole.destroy({ where: { guildID: message.guild.id, messageID: msg.messageID }});
            return message.util.reply(`successfully disabled this reaction role.`)
        }
	}
}

module.exports = ToggleLogsCommand;