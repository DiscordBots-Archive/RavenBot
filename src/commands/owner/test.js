const { Command } = require('discord-akairo');
const { db } = require('../../struct/Database');
const Tags = require('../../models/Tags');
const sequelize = require('sequelize');

class TestCommand extends Command {
	constructor() {
		super('test', {
			aliases: ['test'],
			category: 'owner',
			ownerOnly: true
		});

		this.perPage = 1;
	}
	

	async exec(message) {
		//const tag = await Tags.findOne({ order: [ sequelize.fn('max', sequelize.col('uses')) ]});
		//console.log(tag)
		const page = 1;
		const topStars = await db.query(`
		SELECT
			MAX("uses") AS amount,
			"authorID", "name"
		FROM tags
		WHERE "guildID" = :guildID
		GROUP BY "authorID", "name" ORDER BY amount DESC
		OFFSET :offset
		LIMIT :limit
	`, {
		type: db.Sequelize.QueryTypes.SELECT,
		replacements: {
			guildID: message.guild.id,
			offset: (page - 1) * this.perPage,
			limit: this.perPage
		}
	});

	const users = await Promise.all(topStars.map(async row => {
		const user = await this.client.users.fetch(row.authorID).catch(() => ({ tag: 'Unknown#????' }));

		console.log(row)
		return {
			tag: user.tag,
			amount: row.amount,
			name: row.name
		};
	}));

	const embed = this.client.util.embed()
		.setColor(0xFFAC33)

	if (users.length) {
		const desc = users
			.map(({ tag, amount, name }, index) => `${1 + index + ((page - 1) * this.perPage)}. ${tag} :: ${amount} :: ${name}`);

		embed.setDescription(desc);
	}

	return message.util.send({ embed });
	}
}

module.exports = TestCommand;
