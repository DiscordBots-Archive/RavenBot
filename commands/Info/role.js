const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'role',
	type: 'Info',
    usage: '[role name/id]',
    aliases: ['role-info'],
    description: 'Get info about channel',
    example: ['role Admin', 'role @Admin', 'role 513998704911450136'],
    guildOnly: true,
	
	async execute(message, args, client) {

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


        let role = message.guild.roles.get(args[0]) || message.guild.roles.find(r => r.name === args.join(' ')) || message.mentions.roles.first();
        if (!role) {
            role = message.member.highestRole;
        }

        const permissions = Object.keys(PERMISSIONS).filter(
			permission => role.serialize()[permission]
		);
        
        const embed = new Discord.RichEmbed()
        //.setColor(3447003)
        .setAuthor(`Info about @${role.name} | ${role.id}`)
        .addField(
            '❯ Info',`• Color: ${role.hexColor.toUpperCase()}` + '\n' +
            `• Hoisted: ${role.hoist ? 'Yes' : 'No'}` + '\n' +
            `• Mentionable: ${role.mentionable ? 'Yes' : 'No'}` + '\n' +
            `• Creation Date: ${moment.utc(role.createdAt).format('D-MM-YY, k:mm')}`)
        .addField('❯ Permissions', `${permissions.map(permission => `• ${PERMISSIONS[permission]}`).join('\n') || 'None'}`)
        .setThumbnail(message.guild.iconURL);        
        message.channel.send({embed})
	},
};
