const { Command } = require('discord-akairo');
const ReactionRole = require('../../models/ReactionRoles');
const emojis = require('node-emoji');

class SetReactionRoleCommand extends Command {
    constructor() {
        super('set-reaction-role', {
            aliases: ['set-reaction', 'set-reaction-role'],
            category: 'config',
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    id: 'emoji',
                    content: 'match',
                    index: 0,
                    type: (match, message) => {
                        return emojis.find(match);
                    },
                    prompt: {
                        start: 'what emoji would you like to set?',
                        retry: 'please provide a valid unicode emoji.'
                    }
                },
                {
                    id: 'role',
                    type: 'role',
                    index: 1,
                    prompt: {
                        start: 'What is the Role you would like to set as reaction role?',
                        retry: 'Please provide a valid role.'
                    }
                },
                {
					id: 'channel',
					index: 3,
					match: 'rest',
					type: 'textChannel',
					default: message => message.channel,
					prompt: {
						start: 'That channel could not be found. What channel is the message you are trying to set as reaction role?',
						retry: 'Please provide a valid text channel.',
						optional: true
					}
				},
				{
					id: 'message',
					index: 2,
					type: (phrase, message, { channel }) => {
						if (!phrase) return null;
						return channel.messages.fetch(phrase).catch(() => null);
					},
					prompt: {
						start: 'What is the ID of the message you would like to set as reaction role?',
						retry: (msg, { channel }) => `Please provide a valid message ID in ${channel}.`
					}
				},
            ]
        })
    }

    async exec(message, { emoji, message: msg, role, channel }) {
        //const data = await ReactionRole.findAll({});
        //console.log(JSON.stringify(data));
        const data = await ReactionRole.create({
            messageID: msg.id,
            channelID: channel.id,
            guildID: message.guild.id,
            emoji: emoji.emoji,
            roleID: role.id
        });
        return message.util.send(JSON.stringify(data), { code: 'json'});
    }
}

module.exports = SetReactionRoleCommand;