require('./src/util/Extensions'); require('dotenv').config();
const Client = require('./src/client/Client');
const Logger = require('./src/util/Logger');
const Raven = require('raven');
const client = new Client({ owner: process.env.OWNER, token: process.env.TOKEN });

if (process.env.RAVEN) {
	Raven.config(process.env.RAVEN, {
		captureUnhandledRejections: true,
		autoBreadcrumbs: true,
		environment: 'Raven',
		release: '0.1.0'
	}).install();
}

client.on('disconnect', () => Logger.warn('[CLIENT DISCONNECTED]'))
	.on('reconnect', () => Logger.info('[CLIENT RECONNECTING]'))
	.on('error', err => Logger.error(`[CLIENT ERROR] ${err.message}`))
	.on('warn', warn => Logger.warn(`[CLIENT WARN] ${warn}`));

client.start(); client.metrics();

process.on('unhandledRejection', err => {
	Logger.error(`[UNHANDLED REJECTION] ${err.message}`);
	Logger.stacktrace(err);
});