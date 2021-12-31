import {prefix} from '../config';
import fetch from 'node-fetch';
import randomColor from '../tasks/setRandomColor';
import capitalizeFirstLetter from '../tasks/capitalizeFirstLetter';
import Discord from 'discord.js';

const dictionary = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "def" || command === "definition" || command === "dictionary" || command === "define") {
        if(!args[0]) return message.channel.send("You must specify which word you would like defined.");
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${args[0]}`, {credentials:"include"})
        .then(response => response.json())
        .then((result) => {
            if(result.title === "No Definitions Found"){
                message.reply(`Sorry, but I am unable to look up that word. Perhaps check your spelling?`);
            } else {                
                let definitions = [];
                for(let i = 0; i < result[0].meanings.length; i++) {
                    for (let x = 0; x < result[0].meanings[i].definitions.length; x++) {
                        definitions.push(
                            {name:"Definition", value: capitalizeFirstLetter(result[0].meanings[i].definitions[x].definition)},
                            {name:"Synonyms", value: JSON.stringify(result[0].meanings[i].definitions[x].synonyms)}
                        )
                    }
                }
                let embed = new Discord.MessageEmbed()
                .setColor(randomColor())
                .setTitle(capitalizeFirstLetter(args[0]))
                .setURL(`https://www.dictionary.com/browse/${args[0]}`)
                .setDescription(JSON.stringify(result[0].origin) || "")
                .addFields(
                    definitions
                )
                .setTimestamp()
                .setFooter(`Asked by ${message.author.username}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))   
                message.reply(embed)
            }
        });
    }
}

export default dictionary;