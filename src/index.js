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

client.on('disconnect', () => Logger.warn('[CLIENT DISCONNECTED]'))
	.on('reconnect', () => Logger.info('[CLIENT RECONNECTING]'))
	.on('error', err => Logger.error(`[CLIENT ERROR] ${err.message}`))
	.on('warn', warn => Logger.warn(`[CLIENT WARN] ${warn}`));

client.start();
client.metrics();

process.on('unhandledRejection', err => {
	Logger.error(`[UNHANDLED REJECTION] ${err.message}`);
	Logger.stacktrace(err);
});
