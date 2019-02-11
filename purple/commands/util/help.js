const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'commands', 'list'],
            description: {
                content: 'Displays a list of available commands, or detailed information for a specified command!',
                usage: '<command>',
                examples: ['kick', 'tag']
            },
            category: 'util',
            typing: true,
            ratelimit: 2,
            args: [
                {
                    id: 'command',
                    type: 'commandAlias'
                }
            ]
        });
    };

    exec(message, { command }) {
        
		const prefix = this.handler.prefix(message);
		if (!command) {
			const embed = new MessageEmbed()
                .setColor('#c394f3').setFooter(`© 2018 ${this.client.user.username}`, this.client.user.displayAvatarURL())
                .setTitle('COMMANDS')
				.setDescription(`*A list of available commands. For additional info on a command: \`${prefix}help <command>\`*`);

			for (const category of this.handler.categories.values()) {
				embed.addField(`❯ ${category.id.replace(/(\b\w)/gi, lc => lc.toUpperCase())}`, `${category.filter(cmd => cmd.aliases.length > 0).map(cmd => `*\u200b**${prefix}${cmd.aliases[0]}** - ${cmd.description.content.toLowerCase().replace(/\n/g, '\n \u200b ').replace(/`/g, '').replace(/\*/g, '')}*`).join('\n')}`);
			}

			return message.util.send(embed);
		}

		const embed = new MessageEmbed()
			.setColor('#c394f3')
			.setTitle(`\`${command.aliases[0]} ${command.description.usage ? command.description.usage : ''}\``)
			.addField('❯ Description', command.description.content || '\u200b');

		if (command.aliases.length > 1) embed.addField('❯ Aliases', `\`${command.aliases.join('` `')}\``, true);
		if (command.description.examples && command.description.examples.length) embed.addField('❯ Examples', `\`${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\``, true);

		return message.util.send(embed);
    };
};
module.exports = HelpCommand;