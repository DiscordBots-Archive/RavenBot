const { db } = require('../struct/Database');
const Sequelize = require('sequelize');

const Playlist = db.define('playlist', {
    userID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    guildID: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    songs: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        defaultValue: Array,
        allowNull: false
    },
    plays: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    global: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Playlist;