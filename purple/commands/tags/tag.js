const { Command } = require('discord-akairo');

class TagCommand extends Command {
	constructor() {
		super('tag', {
            aliases: ['tag'],
            category: 'tags',
			description: {
				content: `*Available Methods:*\n` +
					`• show \`<tag>\`\n` +
					`• add \` <tag> <content>\`\n` +
					`• alias \`<old alias> <new alias>\`\n` +
					`• del \`<tag>\`\n` +
					`• edit \`<tag> <content>\`\n` +
					`• info \`<tag>\`\n` +
					`• list \`[member]\`\n` +
					`• download \`[member]\``,
				usage: '<method> <...arguments>',
				examples: [
					'show Test',
					'add Test Test',
					'alias Test New name',
					'del Test',
					'edit Test Some new content',
					'info Test',
					'list @Purple',
					'download @Purple'
				]
			},
			channel: 'guild',
			ratelimit: 2,
			args: [
				{
					id: 'method',
					type: ['show', 'add', 'del', 'delete', 'edit', 'info', 'list', 'download', 'dl', 'alias']
				},
				{
					id: 'name',
					match: 'rest',
					default: ''
				}
			]
		});
	};

	async exec(message, { method, name }) {
		if (!method)return;
		const command = ({
			show: this.handler.modules.get('tag-show'),
			add: this.handler.modules.get('tag-add'),
			del: this.handler.modules.get('tag-delete'),
			delete: this.handler.modules.get('tag-delete'),
			edit: this.handler.modules.get('tag-edit'),
			info: this.handler.modules.get('tag-info'),
			list: this.handler.modules.get('tag-list'),
			download: this.handler.modules.get('tag-download'),
			dl: this.handler.modules.get('tag-download'),
			alias: this.handler.modules.get('tag-alias')
		})[method];

		return this.handler.handleDirectCommand(message, name, command, true);
	};
};
module.exports = TagCommand;
