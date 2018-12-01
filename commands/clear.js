exports.run = async (client, message, args) => {

    if (message.guild.id === '500004711005683717') {

        if(!message.member.roles.some(r=>[process.env.DEV_ROLE, process.env.ADM_ROLE].includes(r.name)) )
        return message.channel.send(`Only Admins can run this command 😒`);
    
        const user = message.mentions.users.first();
        const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        if (!amount) return message.channel.send('Please specify a user and amount, or just an amount, of messages to clear.');
        if (!amount && !user) return message.reply('Please specify a user and amount, or just an amount, of messages to purge.');
        message.channel.fetchMessages({
         limit: 50,
        }).then((messages) => {
         if (user) {
         const filterBy = user ? user.id : Client.user.id;
         messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
         }
         else if (!user) {
            messages = messages.array().slice(0, amount);
        }
    
        {
            message.channel.send(`${amount} messages cleared ✅`)
            .then(msg => {
                msg.delete(4000)
            })
        }
    
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        
        });
    
    } else if (message.guild.id !== '500004711005683717') {

        const user = message.mentions.users.first();
        const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        if (!amount) return message.channel.send('Please specify a user and amount, or just an amount, of messages to clear.');
        if (!amount && !user) return message.reply('Please specify a user and amount, or just an amount, of messages to purge.');
        message.channel.fetchMessages({
         limit: 50,
        }).then((messages) => {
         if (user) {
         const filterBy = user ? user.id : Client.user.id;
         messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
         }
         else if (!user) {
            messages = messages.array().slice(0, amount);
        }
    

        {
            message.channel.send(`${amount} messages cleared ✅`)
            .then(msg => {
                msg.delete(4000)
            })
        }
    
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        
        });
    }


}