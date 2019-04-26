const { db } = require('../struct/Database');
const Sequelize = require('sequelize');

const Rolestate = db.define('roles', {
	userID: {
		type: Sequelize.STRING,
		allowNull: false
	},
	guildID: {
		type: Sequelize.STRING,
		allowNull: false
	},
	rolesID: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		allowNull: true
	}
});

module.exports = Rolestate;
