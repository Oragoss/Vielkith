import {prefix} from '../config';
import fetch from 'node-fetch';
import capitalizeFirstLetter from '../tasks/capitalizeFirstLetter';
const numberOfPokemon = 898;
const fs = require('fs');

const pokemon = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "pokemon") {
        assignPokemon(message);
    }
    
}

const assignPokemon = (message) => {
    //TODO: Obviously make this not so stupidly hard coded
    fs.readFile('D:\\WebProjects\\botSousa\\data\\pokemon.json', 'utf8', function readFileCallback(err, data) {
        if (err){
            console.log(err);
        } else {
            let pokemon = JSON.parse(data);
            let user = `${message.author.username}#${message.author.discriminator}`;
            let hasPokemon = false;
            if(pokemon.length <= 0)
                addEntry(message, user, pokemon);
            for(let i = 0; i < pokemon.length; i++) {
                if (user === pokemon[i].user) {
                    hasPokemon = true;
                    Promise.resolve(message.reply(`Your pokemon is:\n ${pokemon[i].name}`, {
                        files : [pokemon[i].sprite]
                    }));
                }
            }          
            if(!hasPokemon) {
                addEntry(message, user, pokemon);
            }
        }
    });
}

const addEntry = (message, user, pokemon) => {
    const newPokemon = Math.floor(Math.random()*numberOfPokemon)
    fetch(`https://pokeapi.co/api/v2/pokemon/${newPokemon}`, {credentials:"include"})
    .then(response => response.json())
    .then((result) => {
        //~~~~~~~~~~~
        //Figure out how to assign someone else
        //~~~~~~~~~~~
        // if(message.mentions.users) {
        //     let count = 0;
        //     message.mentions.users.map(user => {
        //         count++;
        //         message.channel.send(`${user.username}, hey hey hey`);
        //     });
        //     if(count === 0) { //It won't send if there were mentioned users. Else this will be sent in it's place
        //         message.reply("Well, hello there!");
        //     }
        // }
        let newPokemon = {
            user: user,
            pokemonId: result.id,
            name: capitalizeFirstLetter(result.name),
            sprite: result.sprites.front_default
        }
        pokemon.push(newPokemon);
        let json = JSON.stringify(pokemon);
        fs.writeFile('D:\\WebProjects\\botSousa\\data\\pokemon.json', json, 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(`Added ${user} new pokemon to the roster!\n` + json);
            Promise.resolve(message.reply(`Your pokemon is:\n ${newPokemon.name}`, {
                files : [newPokemon.sprite]
            }));
        });
    }); 
}

export default pokemon;