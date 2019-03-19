const { db } = require('../struct/Database');
const Sequelize = require('sequelize');

const Levels = db.define('userlevels', {
    userID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uses: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    guildID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

module.exports = Levels;