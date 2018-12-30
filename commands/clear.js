exports.run = async (client, message, args) => {

    if (message.channel.type == 'dm') return;
    if (message.channel.id === '501395897322831875') return message.channel.send('This Command id disabled for this channel!');
    if (message.channel.id === '513999069111255040') return message.channel.send('This Command id disabled for this channel!');
    if (message.channel.id === '527084773164843018') return message.channel.send('This Command id disabled for this channel!');
    if (message.channel.id === '527125137959682049') return message.channel.send('This Command id disabled for this channel!');
    if (message.channel.id === '517935069172727818') return message.channel.send('This Command id disabled for this channel!');
    if (message.channel.id === '524139389635395594') return message.channel.send('This Command id disabled for this channel!');
    if (message.channel.id === '524139508757823498') return message.channel.send('This Command id disabled for this channel!');
    if (message.channel.id === '524139577011863562') return message.channel.send('This Command id disabled for this channel!');
    if (message.channel.id === '521735333658755093') return message.channel.send('This Command id disabled for this channel!');
    if (message.channel.id === '513743066025426945') return message.channel.send('This Command id disabled for this channel!');
    if (message.channel.id === '521739952728440832') return message.channel.send('This Command id disabled for this channel!');

    if (!message.member.roles.get('500700090181222400') && !message.member.roles.get('500683949018710036')  && !message.member.roles.get('500683658009640975')) {
        //message.delete(4000);
        return message.channel.send(`Only <@&500683949018710036> / <@&500683658009640975> use this command`).then(msg => {msg.delete(5000)});
    }

    const user = message.mentions.users.first();
    const author = message.author;
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
    if (!amount) {
        message.delete(4000);
        return message.channel.send('Please specify a user and amount, or just an amount, of messages to clear').then(msg => {msg.delete(5000)});
    }
    if (!amount && !user) {
        message.delete(4000);
        return message.reply('Please specify a user and amount, or just an amount, of messages to purge').then(msg => {msg.delete(5000)});
    }
    message.channel.fetchMessages({
     limit: 50,
    }).then((messages) => {

        if (user) {

            if (user == author) {
                message.delete(4000);
                const filterBy = author ? user.id : client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(1, amount + 1);
            } 
            else if (user !== author) {
                message.delete(4000);
                const filterBy = user ? user.id : client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
            }

        }
        else if (!user) {
            message.delete(4000);
            messages = messages.array().slice(1, amount + 1);
        }

        {
            message.channel.send(`${amount} messages cleared ✅`).then(msg => {msg.delete(4000)});
        }

        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    
    });

}