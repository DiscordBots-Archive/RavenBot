const PurpleClient = require('./purple/client/PurpleClient');
const { token } = require('./auth.json');
const client = new PurpleClient();

client.on('error', err => client.logger.error(`[CLIENT ERROR] ${err.message}`, err.stack)).on('warn', warn => client.logger.warn(`[CLIENT WARN] ${warn}`));

client.start(token);
client.metrics();