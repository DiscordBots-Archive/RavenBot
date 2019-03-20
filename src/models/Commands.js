const { db } = require('../struct/Database');
const Sequelize = require('sequelize');

const Commands = db.define('commands', {
    commandID: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    categoryID: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    commandAlias: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    uses: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    guildID: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Commands;