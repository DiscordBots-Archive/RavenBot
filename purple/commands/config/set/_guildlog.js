const { Command } = require('discord-akairo');

class SetGuildLogCommand extends Command {
    constructor() {
        super('set-guildlog', {
           description: {
               content: 'Sets the guild log to capture message edit, delete, etc',
               usage: '<channel>',
               examples: ['#guild-log', 'guild-log', '5465454654985659']
           },
           category: 'config',
           channel: 'guild',
           userPermissions: ['MANAGE_GUILD'],
           clientPermissions: ['MANAGE_WEBHOOKS'],
           ratelimit: 2,
           args: [
               {
                   id: 'channel',
                   match: 'content',
                   type: 'textChannel',
                   prompt: {
                       start: message => `*${message.author}, what channel you want to set?*`,
                       retry: message => `*${message.author}, please provide a valid channel...*`
                   }
               }
           ]
        });
    }

    async exec(message, { channel }) {
        
        try {

            this.client.settings.set(message.guild.id, 'guildLog', channel.id);
            const Webhook = await channel.createWebhook(this.client.user.username || this.client.user.tag)
            this.client.settings.set(message.guild.id, 'WebhookID', Webhook.id)
            this.client.settings.set(message.guild.id, 'WebhookToken', Webhook.token)
            
        } catch {}

        return message.util.reply(`set guild log channel to **${channel.name}**`);
		
    }
}

module.exports = SetGuildLogCommand;