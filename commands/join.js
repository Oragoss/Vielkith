import {prefix} from '../config';

const join = (message) => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if(command === "join") {
        const guildMember = message.member;
        const role = message.guild.roles.find('name', 'Members');

       return guildMember.addRole(role)
        .then(console.log)
        .catch(
            console.error
        );
    }

};

export default join;