import {prefix} from '../config';
import fetch from 'node-fetch';
import Discord from 'discord.js';
import randomColor from '../tasks/setRandomColor';
import getAuthorDisplayName from '../tasks/getAuthorDisplayName';

const advice = (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "advice") {
        fetch("http://api.adviceslip.com/advice", {credentials:"include"})
        .then(response => response.json())
        .then((result) => {
            let embed = new Discord.MessageEmbed()
            .setColor(randomColor())
            .setDescription(result.slip.advice)
            .setTimestamp()
            .setFooter(`Asked by ${getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))   
            message.reply(embed)
        });
    }
}

export default advice;