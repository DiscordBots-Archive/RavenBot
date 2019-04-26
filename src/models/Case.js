const { db } = require('../struct/Database');
const Sequelize = require('sequelize');

const Case = db.define('cases', {
	caseID: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	targetID: {
		type: Sequelize.STRING,
		allowNull: false
	},
	targetTag: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	guildID: {
		type: Sequelize.STRING,
		allowNull: false
	},
	authorID: {
		type: Sequelize.STRING,
		allowNull: true
	},
	authorTag: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	messageID: {
		type: Sequelize.STRING,
		allowNull: true
	},
	reason: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	action: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	action_duration: {
		type: Sequelize.DATE(6),
		allowNull: true
	},
	action_processed: {
		type: Sequelize.BOOLEAN,
		allowNull: true
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});

module.exports = Case;
