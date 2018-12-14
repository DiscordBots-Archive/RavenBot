const   Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (message.channel.type == 'dm')
    return message.channel.send(`This is Not a right plate to use this Command!`);

    if (!message.member.roles.get('500700090181222400') && !message.member.roles.get('500683949018710036'))
    return message.channel.send('Only Admins can use this Command!');

    let member = message.mentions.members.first();

    if (!member)
    return message.channel.send(`Please mention a valid member of this server! <:wrong:523020135737458689>`);

    /*if (member == message.guild.members.get(message.author.id)) 
    return message.channel.send("Don't mute yourself Idiot!");*/
    
    if (member == message.guild.members.get(client.user.id)) 
    return message.channel.send("Hello <:meww:523021051202895872>, that's me! **I'm not roleable!!!** <:huh:523021014481764352>");

    let access = args.slice(1).join(' ').replace(/ staff/g, '').replace(/ coadmin/g, '').replace(/ verified/g, '').replace(/ admin/g, '');
    let perm = args.slice(2).join(' ');

    if (access == 'add') {
        if (perm == 'staff') {
            let staffrole = message.guild.roles.get('513284645274517504');
            if (member.roles.has('513284645274517504')) 
            return message.channel.send("User is already a Staff <:done:523005735001653248>");
            let mod_log_channel = message.guild.channels.find(c => c.name === 'mod-log');

            member.addRole(staffrole).then(() => {
                message.channel.send(`Added Staff Role`)
                .catch(error => message.channel.send(`I could not add Staff Role\n ${error}`));
            })

        } else if (perm == 'coadmin') {
            let cadmin = message.guild.roles.get('500683658009640975');
            if (member.roles.has('500683658009640975')) 
            return message.channel.send("User is already a Co-Admin!");
            let mod_log_channel = message.guild.channels.find(c => c.name === 'mod-log');

            member.addRole(cadmin).then(() => {
                message.channel.send(`Added Co-Admin Role`)
                .catch(error => message.channel.send(`I could not add Staff Role\n ${error}`));
            })

        } else if(perm == 'verified') {
            let vrole = message.guild.roles.get('500683488538656768');
            if (member.roles.has('500683488538656768'))
            return message.channel.send('User is already Verified');
            let mod_log_channel = message.guild.channels.find(c => c.name === 'mod-log');

            member.addRole(vrole).then(() => {
                message.channel.send(`Added Verified Role`)
                .catch(error => message.channel.send(`I could not add Staff Role\n ${error}`));
            })

        } else if(perm == 'admin') {
            let vrole = message.guild.roles.get('500683949018710036');
            if (member.roles.has('500683949018710036')) 
            return message.channel.send("User is already an Admin");
            let mod_log_channel = message.guild.channels.find(c => c.name === 'mod-log');

            member.addRole(vrole).then(() => {
                message.channel.send(`Added Verified Role`)
                .catch(error => message.channel.send(`I could not add Staff Role\n ${error}`));
            })

        } else {
            message.channel.send('Wrong Arguments! **XX001**');
        };


    } else if (access == 'remove') {

        if (perm == 'staff') {
            let staffrole = message.guild.roles.get('513284645274517504');
            if (!member.roles.has('513284645274517504')) 
            return message.channel.send("User is already not a Staff");
            let mod_log_channel = message.guild.channels.find(c => c.name === 'mod-log');

            member.removeRole(staffrole).then(() => {
                message.channel.send(`Removed Staff Role`)
                .catch(error => message.channel.send(`I could not remove Staff Role\n ${error}`));
            })

        } else if (perm == 'coadmin') {
            let cadmin = message.guild.roles.get('500683658009640975');
            if (!member.roles.has('500683658009640975')) 
            return message.channel.send("User is already not a Co-Admin!");
            let mod_log_channel = message.guild.channels.find(c => c.name === 'mod-log');

            member.removeRole(cadmin).then(() => {
                message.channel.send(`Removed Co-Admin Role`)
                .catch(error => message.channel.send(`I could not remove Staff Role\n ${error}`));
            })

        } else if(perm == 'verified') {
            let vrole = message.guild.roles.get('500683488538656768');
            if (!member.roles.has('500683488538656768'))
            return message.channel.send('User is already not Verified');
            let mod_log_channel = message.guild.channels.find(c => c.name === 'mod-log');

            member.removeRole(vrole).then(() => {
                message.channel.send(`Removed Verified Role`)
                .catch(error => message.channel.send(`I could not remove Staff Role\n ${error}`));
            })

        } else if(perm == 'admin') {
            if (!message.member.roles.has('500700090181222400'))
            return message.channel.send("You can't use this command to an Admin")
            let vrole = message.guild.roles.get('500683949018710036');
            if (!member.roles.has('500683949018710036')) 
            return message.channel.send("User is already not an Admin");
            let mod_log_channel = message.guild.channels.find(c => c.name === 'mod-log');

            member.removeRole(vrole).then(() => {
                message.channel.send(`Removed Admin Role`)
                .catch(error => message.channel.send(`I could not add Staff Role\n ${error}`));
            })

        } else {
            message.channel.send('Wrong Arguments! ** XX002**');
        };

    } else {
        message.channel.send('Wrong Arguments! **XX003**');
    };
}