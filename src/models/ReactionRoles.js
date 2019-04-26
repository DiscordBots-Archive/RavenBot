const { db } = require('../struct/Database');
const Sequelize = require('sequelize');

const ReactionRole = db.define('reactionroles', {
	messageID: {
		type: Sequelize.STRING,
		allowNull: false
	},
	roleID: {
		type: Sequelize.STRING,
		allowNull: false
	},
	guildID: {
		type: Sequelize.STRING,
		allowNull: false
	},
	channelID: {
		type: Sequelize.STRING,
		allowNull: false
	},
	emoji: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = ReactionRole;
