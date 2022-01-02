import capitalizeFirstLetter from '../tasks/capitalizeFirstLetter';
import {prefix} from '../config';
import fetch from 'node-fetch';
import Discord from 'discord.js';
import randomColor from '../tasks/setRandomColor';
import getAuthorDisplayName from '../tasks/getAuthorDisplayName';

const compliment = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "compliment") {
        fetch("https://complimentr.com/api", {credentials:"include"})
        .then(response => response.json())
        .then((result) => {
            message.delete();
            if(!args[0]) {
                let embed = new Discord.MessageEmbed()
                .setColor(randomColor())
                .setDescription(`<@${message.author.id}> ${capitalizeFirstLetter(result.compliment)}!`)
                .setTimestamp()
                .setFooter(`Asked by ${getAuthorDisplayName(message)}. Type !compliment if you'd like one too!`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))   
                message.channel.send(embed)
            //If member wants to compliment another member:
            } else {
                message.mentions.users.map(user => {
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor(randomColor())
                    .setDescription(`<@${user.id}> ${capitalizeFirstLetter(result.compliment)}!`)
                    .setTimestamp()
                    .setFooter(`Sent by ${getAuthorDisplayName(message)}. Type !compliment @${message.author.username} to compliment them back!`, message.author.avatarURL()));
                });
            }
        });
    }
}

export default compliment;