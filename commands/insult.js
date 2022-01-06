import {prefix} from '../config';
import fetch from 'node-fetch';
import Discord from 'discord.js';
import randomColor from '../tasks/setRandomColor';
import getAuthorDisplayName from '../tasks/getAuthorDisplayName';
import capitalizeFirstLetter from '../tasks/capitalizeFirstLetter';

const insult = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "insult") {
        fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json", {credentials:"include"})
        .then(response => response.json())
        .then((result) => {
            message.delete();
            const insult = capitalizeFirstLetter(result.insult.replace(/&quot;/g, '\\"'));
            if(!args[0]) {
                let embed = new Discord.MessageEmbed()
                .setColor(randomColor())
                .setDescription(`<@${message.author.id}> ${(Math.floor(Math.random() * 100) <= 5) ? randomInsult() : insult}`)
                .setTimestamp()
                .setFooter(`Asked by ${getAuthorDisplayName(message)}. Type !insult if you'd like one too!`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))   
                message.channel.send(embed)
            //If member wants to compliment another member:
            } else {
                message.mentions.users.map(user => {
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor(randomColor())
                    .setDescription(`<@${user.id}> ${(Math.floor(Math.random() * 100) <= 5) ? randomInsult() : insult}`)
                    .setTimestamp()
                    .setFooter(`Sent by ${getAuthorDisplayName(message)}. Type !insult @${message.author.username} to insult them back!`, message.author.avatarURL()));
                });
            }
        });
    }
}


const randomInsult = () => {
    let helper = Math.floor(Math.random() * 5) + 1
    let insult = "No insult processed.";
    switch(helper) {
        case 1:
            insult = "Your mother was a murloc!";
        break
        case 2:
            insult = "Your processing power is limited!";
        break
        case 3:
            insult = "It takes you more than 3000 miliseconds to solve a math problem."
        break
        case 4:
            insult = "You'd make an orc look pretty."
        break
        case 5:
            insult = "I'd slap you but I'm afraid I'd catch something."
        break
    }

    return insult;
}

export default insult;