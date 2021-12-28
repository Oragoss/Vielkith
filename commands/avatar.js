import {prefix} from '../config';

const avatar = (message) => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if(command === 'avatar') {
        //How to have more than one tagged user
        if(!args[0]) {
            let avatarURL = message.author.displayAvatarURL;
            return message.reply("", avatarURL);
        }
        else {
            const avatarList = message.mentions.users.map(user => {
                return `${user.username}'s avatar: ${user.displayAvatarURL}`;
            });
            return  message.channel.send(avatarList);
        }
    }
}

export default avatar;