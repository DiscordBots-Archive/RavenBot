const { Command } = require('discord-akairo');
const ReactionRole = require('../../models/ReactionRoles');
const emojis = require('node-emoji');

class SetReactionRoleCommand extends Command {
    constructor() {
        super('set-reaction-role', {
            aliases: ['set-reaction', 'set-reaction-role', 's-r-r'],
            category: 'config',
            userPermissions: ['ADMINISTRATOR'],
        })
    }
    
    async *args() {
        const emoji = yield {
            index: 0,
            content: 'match',
            type: async (msg, content) => {
                const emoji = emojis.find(content);
                if (!emoji) return null;
                const uwu = await msg.react(emoji.emoji).catch(() => false);
                if (uwu) return emoji;
            },
            prompt: {
                start: 'What is the emoji you would like to set as reaction role?',
                retry: 'Please provide a valid unicode emoji.'
            }
        };
        const role = yield {
            index: 1,
            type: 'role',
            prompt: {
                start: 'What is the role you would like to set as reaction role?',
                retry: 'Please provide a valid role.'
            }
        };
        const channel = yield {
            index: 3,
            match: 'rest',
            type: 'textChannel',
            default: message => message.channel,
            prompt: {
                start: 'That channel could not be found. What channel is the message you are trying to set as reaction role?',
                retry: 'Please provide a valid text channel.',
                optional: true
            }
        };
        const message = yield {
            index: 2,
            type: async (msg, phrase) => {
                if (!phrase) return null;
                return await channel.messages.fetch(phrase).catch(() => null)
            },
            prompt: {
                start: 'What is the ID of the message you would like to set as reaction role?',
                retry: `Please provide a valid message ID in ${channel}.`
            }
        }
        return { emoji, role, channel, message };
    }

    async exec(message, { emoji, message: msg, role, channel }) {
        await ReactionRole.create({
            messageID: msg.id,
            channelID: channel.id,
            guildID: message.guild.id,
            emoji: emoji.emoji,
            roleID: role.id
        });
        const embed = this.client.util.embed().setAuthor('Reaction Role').setColor(0x8387db)
        .addField('Emoji', emoji.emoji).addField('Channel', msg.channel)
        .addField('Role', role)
        .addField('Message', [
            `[Jump To](${msg.url})`,
            msg.content.substring(0, 900)
        ])
        msg.react(emoji.emoji);
        return message.util.send({ embed });
    }
}

module.exports = SetReactionRoleCommand;