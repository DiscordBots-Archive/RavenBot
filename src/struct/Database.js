const Logger = require('../util/Logger');
const path = require('path');
const readdir = require('util').promisify(require('fs').readdir);
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.PostgreSQL, {
	logging: false,
	operatorsAliases: Sequelize.Op
});

class Database {
	static get db() {
		return db;
	}

	static async authenticate() {
		try {
			await db.authenticate();
			Logger.info('Database connection has been established successfully...', { tag: 'PostgreSQL' });
			await this.loadModels(path.join(__dirname, '..', 'models'));
		} catch (err) {
			Logger.error('Unable to connect to the Database...', { tag: 'PostgreSQL' });
			Logger.info('Attempting to connect again in 5 seconds...', { tag: 'PostgreSQL' });
			setTimeout(this.authenticate, 5000);
		}
	}

	static async loadModels(modelsPath) {
		const files = await readdir(modelsPath);
		for (const file of files) {
			const filePath = path.join(modelsPath, file);
			if (!filePath.endsWith('.js')) continue;
			await require(filePath).sync({ alter: true }); // eslint-disable-line no-await-in-loop
		}
	}
}

module.exports = Database;
