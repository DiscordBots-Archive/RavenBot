const config = {
    
    "discord" : {

        "token" : process.env.DISCORD_TOKEN,
        "prefix" : process.env.DISCORD_PREFIX,

    },"telegram" : {

        "token" : process.env.TELEGRAM_TOKEN,
        "chat_id" : process.env.TELEGRAM_CHAT_ID,
        "log" : process.env.TELEGRAM_LOG

    },"webhooks" : {

        "guild_id" : process.env.WEBHOOK_GUILD_ID,
        "channel_id" : process.env.WEBHOOK_CHANNEL_ID,
        "id" : process.env.WEBHOOK_ID,
        "token" : process.env.WEBHOOK_TOKEN,
    },

}
module.exports = config;
