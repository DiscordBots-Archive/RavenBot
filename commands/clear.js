exports.run = async (client, message, args) => {
    
    /*const user = message.mentions.users.first();
// Parse Amount
const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
if (!amount) return message.reply('Must specify an amount to delete!');
if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
// Fetch 100 messages (will be filtered and lowered up to max amount requested)
message.channel.fetchMessages({
 limit: 100,
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : Client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 } 
   else if (!user) {
           const messages =  message.channel.fetchMessages({limit: amount});
    }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
});*/
    
    
    if (message.guild.id == '500004711005683717') {
    if(!message.member.roles.some(r=>[process.env.DEV_ROLE].includes(r.name)) )
    return message.channel.send(`${message.author.username} : `+ `This command has been disabled.`);
    const user = message.mentions.users.first();
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.channel.send(`${message.author.username}: ` + "Please provide a number between 2 and 100 for the number of messages to delete");
    if (user) {
 const filterBy = user ? user.id : Client.user.id;
const fetched = await messages.filter(m => m.author.id === filterBy).fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
        .catch(error => message.channel.send (`${error}`));
 }
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
    .catch(error => message.channel.send(`${message.author.username}: ` + `Couldn't delete messages because of: ${error}`));
        }
    else if (message.guild.id !== '500004711005683717') {
    //if(!message.member.roles.some(r=>[process.env.DEV_ROLE].includes(r.name)) )
    //return message.channel.send(`${message.author.username} : `+ `This command has been disabled.`);
    
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.channel.send(`${message.author.username}: ` + "Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
    .catch(error => message.channel.send(`${message.author.username}: ` + `Couldn't delete messages because of: ${error}`));
        }

}
