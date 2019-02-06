const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler, SQLiteProvider } = require('discord-akairo');
const { Counter, collectDefaultMetrics, register } = require('prom-client');
const { logger, createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { MessageEmbed } = require('discord.js');
const { createServer } = require('http');
const Sequelize = require('sequelize');
const { parse } = require('url');
const sqlite = require('sqlite');

class PurpleClient extends AkairoClient {
    constructor() {
        super({
            ownerID: '444432489818357760',
        }, {
            disableEveryone: true
        });

        // handlers=> loading commands, events, etc
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
                modifyStart: str => `${str}\n\nType \`cancel\` to cancel the command.`,
                modifyRetry: str => `${str}\n\nType \`cancel\` to cancel the command.`,
                timeout: 'Guess you took too long, the command has been cancelled.',
                ended: "More than 3 tries and you still didn't quite get it. The command has been cancelled",
                cancel: 'The command has been cancelled.',
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

        // logger=> keeps record of each events
        this.logger = createLogger({
            format: format.combine(
                format.colorize({ level: true }),
                format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
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

        // counter=> message counter
        this.prometheus = {
            messagesCounter: new Counter({ name: 'purple_messages_total', help: 'Total number of messages Purple has seen' }),
            commandCounter: new Counter({ name: 'purple_commands_total', help: 'Total number of commands used' }),
            collectDefaultMetrics,
            register
        };

        this.prometheus.collectDefaultMetrics({ prefix: 'purple_', timeout: 30000 });

        // SQLiteProvider=> database of guild settings
        const db = sqlite.open('./purple/database/database.sqlite').then(d => d.run('CREATE TABLE IF NOT EXISTS guilds (id TEXT NOT NULL UNIQUE, settings TEXT)').then(() => d));
        this.settings = new SQLiteProvider(db, 'guilds', { dataColumn: 'settings' });
        
        // Sequelize=> database of tags
        const sequelize = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            operatorsAliases: false,
            storage: './purple/database/sql-database.sqlite'
        })
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
        })


        // ACTIONS=> default moderation message constructor
        this.ACTIONS = ({
            1: 'ban',
            2: 'unban',
            3: 'kick',
            4: 'kick',
            5: 'mute',
            6: 'restriction',
            7: 'restriction',
            8: 'restriction',
            9: 'warn'
        });
        this.CONSTANTS = {
            ACTIONS: {
                BAN: 1,
                UNBAN: 2,
                SOFTBAN: 3,
                KICK: 4,
                MUTE: 5,
                EMBED: 6,
                EMOJI: 7,
                REACTION: 8,
                WARN: 9
            },
            COLORS: {
                BAN: 16718080,
                UNBAN: 8450847,
                SOFTBAN: 16745216,
                KICK: 16745216,
                MUTE: 16763904,
                EMBED: 16776960,
                EMOJI: 16776960,
                REACTION: 16776960,
                WARN: 16776960
            }
        },

        this.logEmbed = ({message, member, caseNum, action, reason}) => {
    
            const embed = new MessageEmbed()
            if (message) embed.setAuthor(`${message.member.user.tag} | ${message.member.user.id}`, message.member.user.displayAvatarURL())
            .setDescription(`**Member:** ${member.user.tag} (${member.id})` + '\n' +
			`**Action:** ${action}` + '\n' +
            `**Reason:** ${reason}`)
            .setFooter('Case ' + caseNum)
            .setTimestamp()
            return embed;
        }

        this.historyEmbed = ({ message, member }) => {
            const modcount = message.guild.id + member.user.id;

            const kick = this.settings.get(modcount, 'Kick', 0)
            const mute = this.settings.get(modcount, 'Mute', 0)
            const ban = this.settings.get(modcount, 'Ban', 0)
            const warn = this.settings.get(modcount, 'Warn', 0)
            const restriction = this.settings.get(modcount, 'Restriction', 0)

            return new MessageEmbed()
            .setAuthor(`${member.user.tag} | ${member.user.id}`, member.user.displayAvatarURL())

			.setFooter(`${warn} warning${warn > 1 || warn === 0 ? 's' : ''}, ` +
			`${restriction} restriction${restriction > 1 || restriction === 0 ? 's' : ''}, ` +
			`${mute} mute${mute > 1 || mute === 0 ? 's' : ''}, ` +
			`${kick} kick${kick > 1 || kick === 0 ? 's' : ''}, ` +
			`and ${ban} ban${ban > 1 || ban === 0 ? 's' : ''}`);
        }

        this.setup();
    }

    // loader=> loading up all commands, events etc
    setup() {
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

        const resolver = this.commandHandler.resolver;
        resolver.addType('1-10', phrase => {
            const num = resolver.type('integer')(phrase);
            if (num == null) return null;
            if (num < 1 || num > 10) return null;
            return num;
        });

    }

    // counter=> message counter
	metrics() {
		createServer((req, res) => {
			if (parse(req.url).pathname === '/metrics') {
				res.writeHead(200, { 'Content-Type': this.prometheus.register.contentType });
				res.write(this.prometheus.register.metrics());
			}
			res.end();
		}).listen(5400);
    }
    
    // START=> logging in purple, and initializing databases
    async start(token) {
        await this.settings.init();
        await this.Tags.sync();
        await this.login(token);
        console.log('Ready!');
    }

}
module.exports = PurpleClient;