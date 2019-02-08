const { Command } = require('discord-akairo');
const { Util } = require('discord.js');
const util = require('util');
const { MessageEmbed } = require('discord.js');

const NL = '!!NL!!';
const NL_PATTERN = new RegExp(NL, 'g');

class EvalCommand extends Command {
    
	constructor() {
		super('eval', {
			aliases: ['eval', 'ev', 'e'],
			description: {
				content: 'Prohibit/Allow a user from using Purple',
				usage: '<code>'
			},
			category: 'util',
			ratelimit: 2,
			args: [
				{
					id: 'code',
					match: 'content',
					type: 'string',
					prompt: {
						start: (message) => `${message.author}, what would you like to evaluate?`
					}
				}
			]
		});
	}

	async exec(message, { code }) {
		
		if (message.author.id !== this.client.ownerID) return;
		const msg = message;
		const { client, lastResult } = this;
		
		const doReply = (val) => {
			if (val instanceof Error) {
				message.util.send(`Callback error: \`${val}\``);
			} else {
				const result = this._result(val, process.hrtime(this.hrStart));
				if (Array.isArray(result)) {
					for (const res of result) message.util.send(res);
				}

				message.util.send(result);
			}
		};

		let hrDiff;
		try {
			const hrStart = process.hrtime();
			this.lastResult = eval(code);
			hrDiff = process.hrtime(hrStart);
		} catch (error) {
			return message.util.send(`Error while evaluating: \`${error}\``);
		}

		this.hrStart = process.hrtime();
		const result = this._result(this.lastResult, hrDiff, code);
		if (Array.isArray(result)) return result.map(async res => message.util.send(res));
		return message.util.send(result);
	}

	_result(result, hrDiff, input) {
        
        const inspected = util.inspect(result, { depth: 0 }).replace(NL_PATTERN, '\n').replace(this.sensitivePattern, '--🙄--');
        
		const split = inspected.split('\n');
		const last = inspected.length - 1;
		const prependPart = inspected[0] !== '{' && inspected[0] !== '[' && inspected[0] !== "'" ? split[0] : inspected[0];
		const appendPart = inspected[last] !== '}' && inspected[last] !== ']' && inspected[last] !== "'" ? split[split.length - 1] : inspected[last];
		const prepend = `\`\`\`javascript\n${prependPart}\n`;
		const append = `\n${appendPart}\n\`\`\``;
		if (input) {
			return Util.splitMessage(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms* \`\`\`javascript\n${inspected}\`\`\`` , { maxLength: 1900, prepend, append });
		}

		return Util.splitMessage(`*Callback executed after ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms* \`\`\`javascript\n${inspected}\`\`\``, { maxLength: 1900, prepend, append });
	}

	get sensitivePattern() {
		if (!this._sensitivePattern) {
			const token = this.client.token.split('').join('[^]{0,2}');
			const revToken = this.client.token.split('').reverse().join('[^]{0,2}');
			Object.defineProperty(this, '_sensitivePattern', { value: new RegExp(`${token}|${revToken}`, 'g') });
		}
		return this._sensitivePattern;
	}
}

module.exports = EvalCommand;
