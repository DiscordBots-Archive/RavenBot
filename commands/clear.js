exports.run = async (client, message, args) => {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.channel.send(`**${message.author.username}**: ` + "Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
    .catch(error => message.channel.send(`**${message.author.username}**: ` + `Couldn't delete messages because of: ${error}`));

}