import {prefix} from '../config';
import randomColor from '../tasks/setRandomColor';
import Discord from 'discord.js';

const avatar = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if(command === 'avatar') {
        //If member wants his own avatar
        if(!args[0]) {
            var embed = new Discord.MessageEmbed()
            .setColor(randomColor())
            .setDescription('<@' + message.author.id + '>' + `'` +'s profile picture')
            .setImage(message.author.avatarURL())
            .setTimestamp()
            .setFooter(`${message.author.username}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))   
            message.channel.send(embed)
        //If member wants other people avatar:
        } else {
            message.mentions.users.map(user => {
                message.channel.send(new Discord.MessageEmbed()
                .setColor(randomColor())
                .setDescription('<@' + user.id + '>' + `'` +'s profile picture'+' ')
                .setImage(user.avatarURL())
                .setTimestamp()
                .setFooter(`${message.author.username}`, message.author.avatarURL()));
            });
        }
    }
}

export default avatar;