const   Discord = require('discord.js');

exports.run = async (client, message, args) => {
    
    if (message.channel.type == 'dm')
    return message.channel.send(`This is Not a right plate to use this Command!`);

    if (message.guild.id !== '500004711005683717') return message.channel.send(`This command works for **Air Hounds - Discord Server** Only <:right:509629414120882176>` + `\n` + `https://discord.gg/8RTMVFW`);

    if (!message.member.roles.get('500700090181222400') && !message.member.roles.get('500683949018710036') && !message.member.roles.get('500683658009640975') && !message.member.roles.get('513284645274517504'))
    return message.channel.send('Only <@&500683949018710036> / <@&500683658009640975> / <@&513284645274517504> can use this Command!');

    let member = message.mentions.members.first();
    let staf = message.guild.roles.get('513284645274517504');

    const embed = new Discord.RichEmbed()
    //.setTitle('Permission Command')
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL)
    .setTimestamp()
    .setColor('#fcfb04')
    .addField("Permission Command" ,"``` !perms @user [add/remove] [Role Name] ``` ")
    .addField("Role Name",
    '<@&500683949018710036> - - admin' + "\n" +
    '<@&500683658009640975> - - - - mod' + '\n' +
    '<@&525375822391934997> - ahstaff' + '\n' +
    '<@&513284645274517504> - - - - staff' + '\n' +
    '<@&500683488538656768> - verified')
    .addField(`Example`, `To add ${staf} Role` + '\n' + '```!perms @user add staff```')

    if (!member)
    return message.channel.send({embed});
    
    if (member == message.guild.members.get(client.user.id)) 
    return message.channel.send("Hello <:meww:523021051202895872>, that's me! **I'm not roleable!!!** <:huh:523021014481764352>");

    let mod_log_channel = message.guild.channels.find(c => c.name === 'mod-log');

    let staff_role = message.guild.roles.get('513284645274517504');
    let mod_role = message.guild.roles.get('500683658009640975');
    let verified_role = message.guild.roles.get('500683488538656768');
    let ah_staff_role = message.guild.roles.get('525375822391934997');
    let admin_role = message.guild.roles.get('500683949018710036');

    let access = args.slice(1).join(' ').replace(/ staff/g, '').replace(/ mod/g, '').replace(/ ahstaff/g, '').replace(/ verified/g, '').replace(/ admin/g, '');
    let perm = args.slice(2).join(' ');

    if (access == 'add') {

        if (perm == 'staff') {
            if (!message.member.roles.has('500700090181222400') && !message.member.roles.has('500683949018710036') && !message.member.roles.has('500683658009640975') && !message.member.roles.has('513284645274517504'))
            return message.channel.send(`Only ${admin_role} / ${mod_role} / ${staff_role} can run this Command!`); // admin & mod & staff

            if (member.roles.has('513284645274517504')) 
            return message.channel.send(`User is already a ${staff_role}! <:done:523005735001653248>`);

            member.addRole(staff_role).then(() => {
                message.channel.send(`Added ${staff_role} Role! <:done:523005735001653248>`)
                .catch(error => message.channel.send(`I could not add ${staff_role} Role\n ${error}`));
            })

        } else if (perm == 'mod') {
            if (!message.member.roles.has('500700090181222400') && !message.member.roles.has('500683949018710036') && !message.member.roles.has('500683658009640975'))
            return message.channel.send(`Only ${admin_role} / ${mod_role} can run this Command!`); // admin & mod

            if (member.roles.has('500683658009640975')) 
            return message.channel.send(`User is already a ${mod_role}! <:done:523005735001653248>`);

            member.addRole(mod_role).then(() => {
                message.channel.send(`Added ${mod_role} Role! <:done:523005735001653248>`)
                .catch(error => message.channel.send(`I could not add ${mod_role} Role\n ${error}`));
            })

        } else if(perm == 'verified') {
            if (!message.member.roles.has('500683488538656768'))
            return message.channel.send(`User is already ${verified_role}! <:done:523005735001653248>`);

            member.addRole(verified_role).then(() => {
                message.channel.send(`Added ${verified_role} Role! <:done:523005735001653248>`)
                .catch(error => message.channel.send(`I could not add ${verified_role} Role\n ${error}`));
            })

        } else if(perm == 'ahstaff') {
            if (message.member.roles.has('525375822391934997'))
            return message.channel.send(`User is already ${ah_staff_role}! <:done:523005735001653248>`);

            member.addRole(ah_staff_role).then(() => {
                message.channel.send(`Added ${ah_staff_role} Role! <:done:523005735001653248>`)
                .catch(error => message.channel.send(`I could not add ${ah_staff_role} Role\n ${error}`));
            })

        } else if(perm == 'admin') {
            if (!message.member.roles.has('500700090181222400') && !message.member.roles.has('500683949018710036'))
            return message.channel.send(`Only ${admin_role} can run this Command!`); // admin

            if (member.roles.has('500683949018710036')) 
            return message.channel.send(`User is already an ${admin_role}! <:done:523005735001653248>`);

            member.addRole(admin_role).then(() => {
                message.channel.send(`Added ${admin_role} Role! <:done:523005735001653248>`)
                .catch(error => message.channel.send(`I could not add ${admin_role} Role\n ${error}`));
            })

        } else {
            message.channel.send({embed});
        };


    } else if (access == 'remove') {

        if (perm == 'staff') {
            if (!message.member.roles.has('500700090181222400') && !message.member.roles.has('500683949018710036') && !message.member.roles.has('500683658009640975'))
            return message.channel.send(`Only ${admin_role} / ${mod_role} can run this Command!`); // admin & mod

            if (!member.roles.has('513284645274517504')) 
            return message.channel.send(`User is already not a ${staff_role}! <:wrong:509629414577930241>`);

            member.removeRole(staff_role).then(() => {
                message.channel.send(`Removed ${staff_role} Role! <:wrong:509629414577930241>`)
                .catch(error => message.channel.send(`I could not remove ${staff_role} Role\n ${error}`));
            })

        } else if (perm == 'mod') {
            if (!message.member.roles.has('500700090181222400') && !message.member.roles.has('500683949018710036') && !message.member.roles.has('500683658009640975'))
            return message.channel.send(`Only ${admin_role} / ${mod_role} can run this Command!`); // admin & mod

            if (!member.roles.has('500683658009640975')) 
            return message.channel.send(`User is already not a ${mod_role}! <:wrong:509629414577930241>`);

            member.removeRole(mod_role).then(() => {
                message.channel.send(`Removed ${mod_role} Role! <:wrong:509629414577930241>`)
                .catch(error => message.channel.send(`I could not remove ${mod_role} Role\n ${error}`));
            })

        } else if(perm == 'verified') {
            if (!member.roles.has('500683488538656768'))
            return message.channel.send(`User is already not ${verified_role}! <:wrong:509629414577930241>`);

            member.removeRole(verified_role).then(() => {
                message.channel.send(`Removed ${verified_role} Role! <:wrong:509629414577930241>`)
                .catch(error => message.channel.send(`I could not remove ${verified_role} Role\n ${error}`));
            })

        } else if(perm == 'ahstaff') {
            if (!member.roles.has('525375822391934997'))
            return message.channel.send(`User is already not a ${ah_staff_role}! <:wrong:509629414577930241>`);

            member.removeRole(ah_staff_role).then(() => {
                message.channel.send(`Removed ${ah_staff_role} Role! <:wrong:509629414577930241>`)
                .catch(error => message.channel.send(`I could not remove ${ah_staff_role} Role\n ${error}`));
            })

        } else if(perm == 'admin') {
            if (!message.member.roles.has('500700090181222400'))
            return message.channel.send(`You can't use this command to an ${admin_role}! <:wrong:509629414577930241>`); // dev

            if (!member.roles.has('500683949018710036')) 
            return message.channel.send(`User is already not an ${admin_role}! <:wrong:509629414577930241>`);

            member.removeRole(admin_role).then(() => {
                message.channel.send(`Removed ${admin_role} Role! <:wrong:509629414577930241>`)
                .catch(error => message.channel.send(`I could not add ${admin_role} Role\n ${error}`));
            })

        } else {
            message.channel.send({embed});
        };

    } else {
        message.channel.send({embed});
    };
}