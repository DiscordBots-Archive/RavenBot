const { db } = require('../struct/Database');
const Sequelize = require('sequelize');

const Commands = db.define('commands', {
    commandID: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    uses: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    guildID: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Commands;