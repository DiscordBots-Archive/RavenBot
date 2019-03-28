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
            args: [
                {
                    id: 'memberlog',
                    match: 'flag',
                    flag: ['--memberlog', '--member']
                },
                {
                    id: 'modlog',
                    match: 'flag',
                    flag: ['--mod', '--modlog'],
                },
                {
                    id: 'guildlog',
                    match: 'flag',
                    flag: ['--logs', '--guildlog']
                },
                {
                    id: 'reactionrole',
                    match: 'flag',
                    flag: ['--reaction', '--reactionrole']
                },
                Control.if((_, args) => args.reactionrole, [
					{
                        id: 'msg',
                        match: 'rest',
                        type: 'reactionRole',
                        prompt: {
                            start: `what is the message id?`,
                            retry: 'message id not not found.'
						}
					}
				])
            ],

			description: { content: 'Toggle logs features on the server.' }
		});
	}

	async exec(message, { memberlog, modlog, guildlog, reactionrole, msg }) {
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

        if (reactionrole) {
            await ReactionRole.destroy({ where: { guildID: message.guild.id, messageID: msg.messageID }});
            return message.util.reply(`successfully disabled this reaction role.`)
        }
	}
}

module.exports = ToggleLogsCommand;
