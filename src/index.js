require('./util/Extensions');
require('dotenv').config();
const Client = require('./client/Client');
const Logger = require('./util/Logger');
const Raven = require('raven');
const { name, version } = require('../package.json');
const client = new Client({ owner: process.env.OWNER, token: process.env.TOKEN });

if (process.env.RAVEN) {
	Raven.config(process.env.RAVEN, {
		captureUnhandledRejections: true,
		autoBreadcrumbs: true,
		environment: name,
		release: version
	}).install();
}

client.on('error', err => Logger.error(err, { tag: 'CLIENT ERROR' }, err.stack))
	.on('shardError', (err, id) => Logger.error(`[SHARD ${id} ERROR] ${err.message}`, { tag: 'SHARD ERROR' }, err.stack))
	.on('warn', warn => Logger.warn(warn, { tag: 'CLIENT WARN' }));
client.start();
client.metrics();

process.on('unhandledRejection', err => {
	Logger.error(`[UNHANDLED REJECTION] ${err.message}`);
});
