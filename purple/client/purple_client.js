const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler, SQLiteProvider } = require('discord-akairo');
const { Counter, collectDefaultMetrics, register } = require('prom-client');
const { logger, createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { MessageEmbed, Util } = require('discord.js');
const { createServer } = require('http');
const Sequelize = require('sequelize');
const ytdl = require('ytdl-core');
const moment = require('moment');
const { parse } = require('url');
const sqlite = require('sqlite');
const Raven = require('raven');
const queue = new Map();
const { Client: Lavaqueue } = require('lavaqueue');
const { Rejects, ReferenceType } = require('rejects')

class PurpleClient extends AkairoClient {
    constructor() {
        super({ownerID: process.env.OWNER}, {disableEveryone: true});

        this.commandHandler = new CommandHandler(this, {
            directory: './purple/commands/',
            prefix: message => {
                if (message.guild) {
                    return this.settings.get(message.guild.id, 'prefix', ';;')
                } return ';;';
            },
            aliasReplacement: /-/g,
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            commandUtilLifetime: 3e5,
            defaultCooldown: 3000,
            defaultPrompt: {
                modifyStart: str => `*${str}\ntype \`cancel\` to cancel the command...*`,
                modifyRetry: str => `*${str}\ntype \`cancel\` to cancel the command...*`,
                timeout: '*You took too long, the command has been cancelled..*',
                ended: "*More than 3 tries and you still didn't quite get it. The command has been cancelled..*",
                cancel: '*The command has been cancelled...*',
                retries: 3,
                time: 30000
            }
        });
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './purple/inhibitors/'
        });
        this.listenerHandler = new ListenerHandler(this, {
            directory: './purple/listeners/'
        });

        this.music = new Lavaqueue({
            userID: '526971716711350273',
            password: 'youshallnotpass',
            hosts: {
                rest: 'http://127.0.0.1:2333',
                ws: 'http://127.0.0.1:2333',
                redis: {
                    port: 6379,
                    host: '127.0.0.1',
                    db: 0
                }
            },
            send: async (guild, packet) => {
                const shardGuild = this.guilds.get(guild);
                if (shardGuild) return shardGuild.shard.send(packet);
                return Promise.resolve();
            }
        });
        this.redis = this.music.queues.redis;

        this.storage = new Rejects(this.redis);
        this.on('raw', async (packet) => {
			switch (packet.t) {
				case 'VOICE_STATE_UPDATE':
					if (packet.d.user_id !== '526971716711350273') return;
					this.music.voiceStateUpdate(packet.d);
					const players = await this.storage.get('players', { type: ReferenceType.ARRAY });
					let index = 0;
					if (Array.isArray(players)) index = players.findIndex(player => player.guild_id === packet.d.guild_id);
					if (((!players && !index) || index < 0) && packet.d.channel_id) {
						this.storage.upsert('players', [{ guild_id: packet.d.guild_id, channel_id: packet.d.channel_id }]);
					} else if (players && typeof index !== 'undefined' && index >= 0 && !packet.d.channel_id) {
						players.splice(index, 1);
						await this.storage.delete('players');
						if (players.length) await this.storage.set('players', players);
					}
					break;
				case 'VOICE_SERVER_UPDATE':
					this.music.voiceServerUpdate(packet.d);
					break;
				case 'MESSAGE_CREATE':
					this.prometheus.messagesCounter.inc();
					break;
				default:
					break;
			}
		});
        
        this.handleVideo = async ({message, video, voiceChannel, playlist = false}) => {
            this.Queue = queue.get(message.guild.id);
            const song = {
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                url: `https://www.youtube.com/watch?v=${video.id}`
            };
            if (!this.Queue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                };
                queue.set(message.guild.id, queueConstruct);
                queueConstruct.songs.push(song);
        
                try {
                    const connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    this.play({guild: message.guild, song: queueConstruct.songs[0]});
                } catch (error) {
                    console.error(`I could not join the voice channel: ${error}`);
                    queue.delete(message.guild.id);
                    return message.channel.send(`I could not join the voice channel: ${error}`);
                }
            } else {
                this.Queue.songs.push(song);
                if (playlist) return;
                else return message.channel.send(`*Queued up : **${song.title}**\u200b*`);
            }
        }
        
        this.play = async ({guild, song}) => {
            this.Queue = queue.get(guild.id);
        
            if (!song) {
                this.Queue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
            }
        
            const dispatcher = this.Queue.connection.play(ytdl(song.url, { quality: 'highestaudio' })).on('end', reason => {
                if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.'); else console.log(reason);
                this.Queue.songs.shift();
                this.play({guild: guild, song: this.Queue.songs[0]});
            }).on('error', error => console.error(error));
            dispatcher.setVolumeLogarithmic(this.Queue.volume / 5);
        
            this.Queue.textChannel.send(`*🎶 Now playing: **${song.title}**\u200b*`);
        }

        this.logger = createLogger({
            format: format.combine(
                format.colorize({ level: true }),
                format.timestamp({ format: 'DD-MM-YY HH:mm:ss' }),
                format.printf((info) => {
                    const { timestamp, level, message, ...rest } = info;
                    return `[${timestamp}] ${level}: ${message}${Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ''}`;
                })
            ),
            transports: [
                new transports.Console({ level: 'info' }),
                new DailyRotateFile({
                    format: format.combine(
                        format.timestamp(),
                        format.json()
                    ),
                    level: 'debug',
                    filename: './logger/purple-%DATE%.log',
                    maxFiles: '14d'
                })
            ]
        });

        const RAVEN = process.env.RAVEN;
        if (RAVEN) {
			Raven.config(RAVEN, {
				captureUnhandledRejections: true,
                autoBreadcrumbs: true,
                environment: 'purple-main',
				release: '0.1.0'
			}).install();
		} else {
			process.on('unhandledRejection', err => this.logger.error(`[UNHANDLED REJECTION] ${err.message}`, err.stack));
		};

        this.prometheus = {
            messagesCounter: new Counter({ name: 'purple_messages_total', help: 'Total number of messages Purple has seen' }),
            commandCounter: new Counter({ name: 'purple_commands_total', help: 'Total number of commands used' }),
            collectDefaultMetrics,
            register
        };
        this.prometheus.collectDefaultMetrics({ prefix: 'purple_', timeout: 30000 });

        const db = sqlite.open('./purple/database/database.sqlite').then(d => d.run('CREATE TABLE IF NOT EXISTS guilds (id TEXT NOT NULL UNIQUE, settings TEXT)').then(() => d));
        this.settings = new SQLiteProvider(db, 'guilds', { dataColumn: 'settings' });
        
        const sequelize = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            operatorsAliases: false,
            storage: './purple/database/sql-database.sqlite'
        });
        this.Tags = sequelize.define('tags', {
            name: {
                type: Sequelize.STRING,
                unique: true,
            },
            guild: Sequelize.STRING,
            user: Sequelize.STRING,
            username: Sequelize.TEXT,
            tag_name: Sequelize.STRING,
            tag_content: Sequelize.TEXT,
            usage_count: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            }
        });
        this.Mute = sequelize.define('mutes', {
            name: {
                type: Sequelize.STRING,
                unique: true,
            },
            guild: Sequelize.STRING,
            user: Sequelize.STRING,
            author: Sequelize.STRING,
            time: Sequelize.DATE
        });
    };

    async setup() {
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.inhibitorHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        });
        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();

        await this.settings.init();
        await this.Tags.sync();
        await this.Mute.sync();
    };

	async metrics() {
		createServer((req, res) => {
			if (parse(req.url).pathname === '/metrics') {
				res.writeHead(200, { 'Content-Type': this.prometheus.register.contentType });
				res.write(this.prometheus.register.metrics());
			};
			res.end();
		}).listen(8800);
    };
    
    async start(token) {
        await this.setup();
        await this.login(token);
        console.log(`[${moment(new Date()).format('DD-MM-YY kk:mm:ss')}] info: [NODE PROCESS STARTED]`);
    };

};
module.exports = PurpleClient;