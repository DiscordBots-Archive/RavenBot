const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class ConfigCommand extends Command {
    constructor() {
        super('show-config', {
           aliases: ['config', 'guild-settings', 'settings'],
           description: {
               content: 'Displays your server settings',
               usage: '[config]',
           },
           category: 'config',
           channel: 'guild',
           ratelimit: 2,
           typing: true,
        });
    }

    async exec(message) {

        const prefix = this.client.settings.get(message.guild.id, 'prefix', undefined);
        const guildLog = this.client.settings.get(message.guild.id, 'guildLog', undefined);
        const modLog = this.client.settings.get(message.guild.id, 'modLogChannel', undefined);
        const memberLog = this.client.settings.get(message.guild.id, 'memberLog', undefined);
        const modRole = this.client.settings.get(message.guild.id, 'modRole', undefined);
        const muteRole = this.client.settings.get(message.guild.id, 'muteRole', undefined);
        const autoRole = this.client.settings.get(message.guild.id, 'autoRole', undefined);
        const counting = this.client.settings.get(this.client.user.id, 'countChannel', undefined);

        const embed = new MessageEmbed().setColor(0x824aee)
        .setTitle(message.guild.name)
        //.setFooter('Server Settings', message.guild.iconURL())
        .addField('Prefix', prefix ? prefix : `${this.handler.prefix(message)} (default)`, true)
        .addField('Mod Log', modLog ? this.client.channels.get(modLog) : 'Not Set', true)
        .addField('Member Log', memberLog ? this.client.channels.get(memberLog) : 'Not Set', true)
        .addField('Guild log', guildLog ? this.client.channels.get(guildLog) : 'Not Set', true)
        .addField('Counting', counting ? this.client.channels.get(counting) : 'Not Set', true)
        .addField('Mod Role', modRole ? message.guild.roles.get(modRole) : 'Not Set', true)
        .addField('Mute Role', muteRole ? message.guild.roles.get(muteRole) : 'Not Set', true)
        .addField('Auto Role', autoRole ? message.guild.roles.get(autoRole) : 'Not Set', true)
        return message.util.send(embed)
        
    }
}

module.exports = ConfigCommand;