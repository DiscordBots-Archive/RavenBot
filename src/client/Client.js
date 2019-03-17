const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const { Counter, collectDefaultMetrics, register } = require('prom-client');
const SettingsProvider = require('../struct/SettingsProviders');
const MuteScheduler = require('../struct/MuteScheduler');
const { Client: Lavaqueue } = require('lavaqueue');
const { Collection, Util } = require('discord.js');
const Database = require('../struct/Database');
const Setting = require('../models/settings');
const { createServer } = require('http');
const Case = require('../models/Case');
const { Rejects } = require('rejects');
const Tags = require('../models/Tags');
const { Op } = require('sequelize');
const { parse } = require('url');
const path = require('path');

class Client extends AkairoClient {

	constructor(config) {
		super({ ownerID: config.owner }, {
			messageCacheMaxSize: 50,
			messageCacheLifetime: 300,
			messageSweepInterval: 900,
			disableEveryone: true,
			disabledEvents: ['TYPING_START']
		});

		this.commandHandler = new CommandHandler(this, {
			directory: path.join(__dirname, '..', 'commands'),
			aliasReplacement: /-/g,
			prefix: message => this.settings.get(message.guild, 'prefix', '*'),
			allowMention: true,
			fetchMembers: true,
			commandUtil: true,
			commandUtilLifetime: 3e5,
			commandUtilSweepInterval: 9e5,
			handleEdits: true,
			defaultCooldown: 3000,
			defaultPrompt: {
				modifyStart: (text, msg) => text && `${msg.author} **::** ${text}\ntype \`cancel\` to cancel this command.`,
				modifyRetry: (text, msg) => text && `${msg.author} **::** ${text}\ntype \`cancel\` to cancel this command.`,
				timeout: msg => `${msg.author} **::** Time ran out, command has been cancelled.`,
				ended: msg => `${msg.author} **::** Too many retries, command has been cancelled.`,
				cancel: msg => `${msg.author} **::** Command has been cancelled.`,
				retries: 2,
				time: 30000
			}
		});

		this.inhibitorHandler = new InhibitorHandler(this, { directory: path.join(__dirname, '..', 'inhibitors') });
		this.listenerHandler = new ListenerHandler(this, { directory: path.join(__dirname, '..', 'listeners') });

		this.prometheus = {
            messagesCounter: new Counter({ name: 'client_messages_total', help: 'Total number of messages have seen' }),
            commandCounter: new Counter({ name: 'client_commands_total', help: 'Total number of commands used' }),
            collectDefaultMetrics,
            register
        };
        this.prometheus.collectDefaultMetrics({ prefix: 'client_', timeout: 30000 });

		this.music = new Lavaqueue({
			userID: process.env.ID,
			password: process.env.PASS,
			hosts: {
				rest: process.env.REST,
				ws: process.env.WS,
				redis: {
					port: process.env.PORT,
					host: process.env.HOST,
					db: process.env.DB
				}
			},
			send: async (guild, packet) => {
				const shardGuild = this.guilds.get(guild);
				if (shardGuild) return shardGuild.shard.send(packet);
				return Promise.resolve();
			}
		})

		this.config = config;
		this.storage = new Rejects(this.music.queues.redis);
		this.settings = new SettingsProvider(Setting);
		this.muteScheduler = new MuteScheduler(this, Case);
		this.starboards = new Collection();
		this.cached = new Set();

		this.commandHandler.resolver.addType('tag', async (phrase, message) => {
			if (!phrase) return null;
			phrase = Util.cleanContent(phrase.toLowerCase(), message);
			const tag = await Tags.findOne({ where: { name: phrase, guildID: message.guild.id }});

			return tag || null;
		});

		this.commandHandler.resolver.addType('existingTag', async (phrase, message) => {
			if (!phrase) return null;
			phrase = Util.cleanContent(phrase.toLowerCase(), message);
			const tag = await Tags.findOne({ where: { guildID: message.guild.id,
				[Op.or]: [
					{ name: phrase },
					{ aliases: { [Op.contains]: [phrase] } }
				]
			}});

			return tag ? null : phrase;
		});

		this.commandHandler.resolver.addType('tagContent', (phrase, message) => {
			if (!phrase) phrase = '';
			phrase = Util.cleanContent(phrase, message);
			if (message.attachments.first()) phrase += `\n${message.attachments.first().url}`;

			return phrase || null;
		});

		this.setup();

		setInterval(() => {
			for (const guild of this.guilds.values()) {
				guild.presences.clear();
			}
		}, 900);
	}

	setup() {
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler
		});

		this.commandHandler.loadAll();
		this.inhibitorHandler.loadAll();
		this.listenerHandler.loadAll();
	}

	async metrics() {
		createServer((req, res) => {
			if (parse(req.url).pathname === '/metrics') {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(this.prometheus.register.metrics());
			};
			res.end();
		}).listen(8800);
    };

	async start() {
		await Database.authenticate();
		await this.settings.init();
		return this.login(this.config.token);
	}
}

module.exports = Client;
