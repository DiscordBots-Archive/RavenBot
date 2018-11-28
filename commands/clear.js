exports.run = async (client, message, args) => {
    if (message.guild.id == '500004711005683717') {
    if(!message.member.roles.some(r=>[process.env.DEV_ROLE].includes(r.name)) )
    return message.channel.send(`${message.author.username} : `+ `This command has been disabled.`);
    
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.channel.send(`${message.author.username}: ` + "Please provide a number between 2 and 100 for the number of messages to delete");
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
