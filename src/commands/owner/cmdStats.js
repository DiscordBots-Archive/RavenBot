const { Command } = require('discord-akairo');
const Commands = require('../../models/Commands');
const Levels = require('../../models/UserLevel');
const Tags = require('../../models/Tags');
const { fn, col, Op, literal } = require('sequelize');
const { db } = require('../../struct/Database');

class CommandStatsCommand extends Command {
	constructor() {
		super('command-stats', {
			aliases: ['command-stats'],
			category: 'owner',
			channel: 'guild',
			description: {
				content: 'Displays statistics about commands usage.'
			}
		});
	}

	async exec(message) {
		const cmdTotal = await Commands.sum('uses', { where: { guildID: message.guild.id, categoryID: { [Op.ne]: 'tags' } } }) || 0;
		const tagTotal = await Tags.sum('uses', { where: { guildID: message.guild.id } }) || 0;
		const tags = await Tags.findAll({ where: { guildID: message.guild.id } });

		const _topTags = await Tags.findAll({
			where: { guildID: message.guild.id },
			group: ['tags.id'],
			order: [[fn('max', col('uses')), 'DESC']],
			limit: 3, offset: 0
		});
		const topTags = await Promise.all(_topTags.map(async row => {
			const user = await this.client.users.fetch(row.authorID).catch(() => ({ tag: 'Couldn\'t Fetch User' }));
			return { tag: user.tag, uses: row.uses, name: row.name };
		}));

		const _topCommands = await Commands.findAll({
			where: { guildID: message.guild.id, categoryID: { [Op.ne]: 'tags' } },
			group: ['commands.id'],
			order: [[fn('max', col('uses')), 'DESC']],
			limit: 3, offset: 0
		});
		const topCommands = await Promise.all(_topCommands.map(async row => ({ uses: row.uses, name: row.commandID })));

		// This method is not working.
		/* const _topMaker = await Tags.findAll({
            group: ['authorID'], where: { guildID: message.guild.id },
            attributes: [ [literal(`(SELECT COUNT("authorID"))`), 'total'], "authorID" ],
            order: [ [literal('total'), 'DESC'] ], limit: 3, offset: 0
        });*/
		const _topMaker = await db.query(`
            SELECT
                COUNT("authorID") AS total,
                "authorID"
            FROM tags
            WHERE "guildID" = :guildID
            GROUP BY "authorID" ORDER BY total DESC
            OFFSET :offset
            LIMIT :limit
        `, {
			type: db.Sequelize.QueryTypes.SELECT,
			replacements: {
				guildID: message.guild.id,
				offset: 0,
				limit: 3
			}
		});
		const topMaker = await Promise.all(_topMaker.map(async row => {
			const user = await this.client.users.fetch(row.authorID).catch(() => ({ tag: 'Couldn\'t Fetch User' }));
			return { tag: user.tag, total: row.total };
		}));

		const _topCmdUsers = await Levels.findAll({
			where: { guildID: message.guild.id },
			group: ['userlevels.id'],
			order: [[fn('max', col('commandUses')), 'DESC']],
			limit: 3, offset: 0
		});
		const topCmdUsers = await Promise.all(_topCmdUsers.map(async row => {
			const user = await this.client.users.fetch(row.userID).catch(() => ({ tag: 'Couldn\'t Fetch User' }));
			return { cmdUses: row.commandUses, cmdName: row.commandAlias, tagUses: row.tagUses, tag: user.tag };
		}));

		const _topTagUsers = await Levels.findAll({
			where: { guildID: message.guild.id },
			group: ['userlevels.id'],
			order: [[fn('max', col('tagUses')), 'DESC']],
			limit: 3, offset: 0
		});
		const topTagUsers = await Promise.all(_topTagUsers.map(async row => {
			const user = await this.client.users.fetch(row.userID).catch(() => ({ tag: 'Couldn\'t Fetch User' }));
			return { tagUses: row.tagUses, tag: user.tag };
		}));


		const embed = this.client.util.embed().setAuthor(`${message.guild.name}`, message.guild.iconURL())
			.setColor(0x8387db)
			.setTitle([
				`${tags.length} tags, ${tagTotal} tag uses`,
				`${this.client.commandHandler.modules.size} commands, ${cmdTotal} command uses`
			]);
		if (topCommands.length) {
			const desc = topCommands.map(({ name, uses }, index) => `${1 + index}. **${name}** (${uses} uses)`);
			embed.addField('Top Commands', desc);
		}
		if (topCmdUsers.length) {
			const desc = topCmdUsers.map(({ tag, cmdUses }, index) => `${1 + index}. **${tag}** (${cmdUses} times)`);
			embed.addField('Top Command Users', desc);
		}
		if (topTags.length) {
			const desc = topTags.map(({ name, uses }, index) => `${1 + index}. **${name}** (${uses} uses)`);
			embed.addField('Top Tags', desc);
		}
		if (topTagUsers.length) {
			const desc = topTagUsers.map(({ tagUses, tag }, index) => `${1 + index}. **${tag}** (${tagUses} times)`);
			embed.addField('Top Tag Users', desc);
		}
		if (topMaker.length) {
			const desc = topMaker.map(({ tag, total }, index) => `${1 + index}. **${tag}** (${total} tags)`);
			embed.addField('Top Tag Creators', desc);
		}

		return message.util.send({ embed });
	}
}

module.exports = CommandStatsCommand;
