const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const PERMISSIONS = ({
    ADMINISTRATOR: 'Administrator',
    VIEW_AUDIT_LOG: 'View Audit Log',
    MANAGE_GUILD: 'Manage Server',
    MANAGE_ROLES: 'Manage Roles',
    MANAGE_CHANNELS: 'Manage Channels',
    KICK_MEMBERS: 'Kick Members',
    BAN_MEMBERS: 'Ban Members',
    CREATE_INSTANT_INVITE: 'Create Instant Invite',
    CHANGE_NICKNAME: 'Change Nickname',
    MANAGE_NICKNAMES: 'Manage Nicknames',
    MANAGE_EMOJIS: 'Manage Emojis',
    MANAGE_WEBHOOKS: 'Manage Webhooks',
    VIEW_CHANNEL: 'Read Text & See Voice Channels',
    SEND_MESSAGES: 'Send Messages',
    SEND_TTS_MESSAGES: 'Send TTS Messages',
    MANAGE_MESSAGES: 'Manage Messages',
    EMBED_LINKS: 'Embed Links',
    ATTACH_FILES: 'Attach Files',
    READ_MESSAGE_HISTORY: 'Read Message History',
    MENTION_EVERYONE: 'Mention Everyone',
    USE_EXTERNAL_EMOJIS: 'Use External Emojis',
    ADD_REACTIONS: 'Add Reactions',
    CONNECT: 'Connect',
    SPEAK: 'Speak',
    MUTE_MEMBERS: 'Mute Members',
    DEAFEN_MEMBERS: 'Deafen Members',
    MOVE_MEMBERS: 'Move Members',
    USE_VAD: 'Use Voice Activity'
})

class RoleCommand extends Command {
    constructor() {
        super('roleinfo', {
           aliases: ['roleinfo'],
           description: {
               content: 'Get info about a role',
               usage: '[role]',
               examples: ['Admin', '@Admin', '444432489818357760']
           },
           category: 'info',
           channel: 'guild',
           ratelimit: 2,
           typing: true,
           clientPermissions: ['MANAGE_ROLES', 'EMBED_LINKS'],
           args: [
               {
                   id: 'role',
                   match: 'content',
                   type: 'role',
                   default: message => message.member.roles.highest
               }
           ]
        });
    }

    exec(message, { role }) {

        const permissions = Object.keys(PERMISSIONS).filter(permission => role.permissions.serialize()[permission]);
        const permission = permissions.map(permission => `• ${PERMISSIONS[permission]}`).join('\n')
        
        const embed = new MessageEmbed().setColor(role.hexColor)
        .setAuthor(`${role.name} (${role.id})`)
        .addField('❯ Info',`• Color: ${role.hexColor.toUpperCase()}` + '\n' +
        `• Hoisted: ${role.hoist ? 'Yes' : 'No'}` + '\n' +
        `• Mentionable: ${role.mentionable ? 'Yes' : 'No'}` + '\n' +
        `• Creation Date: ${moment.utc(role.createdAt).format('DD-MM-YY kk:mm:ss')}`)
        .addField('❯ Permissions', `${ permission.length === 487 ? '• Administrator' : permission }`)
        .setThumbnail(message.guild.iconURL());

        return message.util.send(embed);
    }
}

module.exports = RoleCommand;