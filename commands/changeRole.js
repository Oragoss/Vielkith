import {prefix, oragoss} from '../config';

const Roles = ["Red", "Blue", "Lavender", "Green"];

const changeRole = async (message) => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if(command === 'changerole') {

        if(!args[0]) {
            return message.reply("No.");
            // return message.reply("You need to tell me which color you want to be. (i.e 'Red')");
        }
        const member = message.member;

        switch(args[0].toLowerCase()) {
            case 'red':
                // const gRole = member.guild.roles.find(`name`, "Red");
                const gRole = message.guild.roles.cache.find(r => r.name === 'Red');
                message.channel.send(`Congrats <@${member.id}>, you are now ${gRole.name}!`);
                // await removeRoles(message);
                await member.guild.roles.add(gRole.id);


                // if(!member.roles.cache.some(r=> Roles.includes(r.name))) {
                //     Promise.resolve(removeRoles());
                //     //give the member a role
                //     let role = message.guild.roles.find(r => r.name === "Red");
                //     member.addRole(role).catch(console.error);
                // }
                // message.channel.send(`Congrats <@${member.id}> you are now ${gRole.name}`);
            break;
            case 'blue':
                message.reply("Switched you to the Blue role.");
            break;
            case 'purple':
                message.reply("Switched you to the Lavender role.");
            break;
            case 'lavender':
                message.reply("Switched you to the Lavender role.");
            break;
            case 'green':
                message.reply("Switched you to the Green role.");
            break;
            // case 'yellow':
            //     message.reply("Switched you to the Yellow role.");
            // break;
            default: `That role does not exist yet, bug ${oragoss} to make it.`
            break;
        }
    }
}

const removeRoles = (message) => {
    // console.log(member);
    // for(let i = 0; i < Roles.length; i++) {
    //     member.removeRole(
    //         member.guild.roles.find(`name`, Roles[i].name)
    //     ).catch(console.error);
    // }
    const member = message.member;

    member.removeRole(
        message.guild.roles.cache.find(r => r.name === 'Red')
    ).catch(console.error);
    member.removeRole(
        message.guild.roles.cache.find(r => r.name === "Blue")
    ).catch(console.error);
    member.removeRole(
        message.guild.roles.cache.find(r => r.name === "Lavender")
    ).catch(console.error);
    member.removeRole(
        message.guild.roles.cache.find(r => r.name === "Green")
    ).catch(console.error);
}

export default changeRole;