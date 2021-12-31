import {prefix} from '../config';
import fetch from 'node-fetch';
import capitalizeFirstLetter from '../tasks/capitalizeFirstLetter';
import getAuthorDisplayName from '../tasks/getAuthorDisplayName';
const numberOfPokemon = 898;
import randomColor from '../tasks/setRandomColor';
import Discord from 'discord.js';
const fs = require('fs');

const pokemon = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence
    if (command === "pokemon") {
        if(!args[0]) //If the user wants their own pokemon
        { getPokemon(message); }
        else {
            let otherUser = `${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}`;
            getPokemonByUser(message, otherUser);
        }
    }

    if(command === "encounter" || command === "battle") {

    }
}

const getPokemon = (message) => {
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
                    let embed = new Discord.MessageEmbed()
                        .setColor(randomColor())
                        .setDescription(`<@${message.author.id}>, Your pokemon is:\n ${pokemon[i].name}`)
                        .setImage(pokemon[i].sprite)
                        .addFields(
                            {name:"Level", value: pokemon[i].level},
                            {name:"Hp", value: pokemon[i].hp},
                            {name:"Attack", value: pokemon[i].attack},
                            {name:"Defense", value: pokemon[i].defense},
                            {name:"Special Attack", value: pokemon[i].specialAttack},
                            {name:"Special Defense", value: pokemon[i].specialDefense},
                            {name:"Speed", value: pokemon[i].speed},
                        )
                        .setTimestamp()
                        .setFooter(`Asked by ${getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                    Promise.resolve(message.channel.send(embed));
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
        console.log(result.stats);
        let newPokemon = {
            user: user,
            pokemonId: result.id,
            name: capitalizeFirstLetter(result.name),
            sprite: result.sprites.front_default,
            hp: result.stats[0].base_stat,
            attack: result.stats[1].base_stat,
            defense: result.stats[2].base_stat,
            specialAttack: result.stats[3].base_stat,
            specialDefense: result.stats[4].base_stat,
            speed: result.stats[5].base_stat,
            exp: 0,
            level: 1
        }
        pokemon.push(newPokemon);
        let json = JSON.stringify(pokemon);
        fs.writeFile('D:\\WebProjects\\botSousa\\data\\pokemon.json', json, 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
            // console.log(`Added ${user} new pokemon to the roster!\n` + json);
            let embed = new Discord.MessageEmbed()
                        .setColor(randomColor())
                        .setDescription(`Your pokemon is:\n ${newPokemon.name}`)
                        .setImage(newPokemon.sprite)
                        .addFields(
                            {name:"Level", value: newPokemon.level},
                            {name:"Hp", value: newPokemon.hp},
                            {name:"Attack", value: newPokemon.attack},
                            {name:"Defense", value: newPokemon.defense},
                            {name:"Special Attack", value: newPokemon.specialAttack},
                            {name:"Special Defense", value: newPokemon.specialDefense},
                            {name:"Speed", value: newPokemon.speed},
                        )
                        .setTimestamp()
                        .setFooter(`Asked by ${getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
            Promise.resolve(message.channel.send(embed));
        });
    }); 
}

const getPokemonByUser = (message, user) => {
    fs.readFile('D:\\WebProjects\\botSousa\\data\\pokemon.json', 'utf8', function readFileCallback(err, data) {
        if (err){
            console.log(err);
        } else {
            let pokemon = JSON.parse(data);            
            let hasPokemon;
            if(pokemon.length != 0) {
                for(let i = 0; i < pokemon.length; i++) {
                    if (user === pokemon[i].user) {
                        hasPokemon = true;
                        let embed = new Discord.MessageEmbed()
                                    .setColor(randomColor())
                                    .setDescription(`<@${message.mentions.users.first().id}>'s pokemon is:\n ${pokemon[i].name}`)
                                    .setImage(pokemon[i].sprite)
                                    .addFields(
                                        {name:"Level", value: pokemon[i].level},
                                        {name:"Hp", value: pokemon[i].hp},
                                        {name:"Attack", value: pokemon[i].attack},
                                        {name:"Defense", value: pokemon[i].defense},
                                        {name:"Special Attack", value: pokemon[i].specialAttack},
                                        {name:"Special Defense", value: pokemon[i].specialDefense},
                                        {name:"Speed", value: pokemon[i].speed},
                                    )
                                    .setTimestamp()
                                    .setFooter(`Asked by ${getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                        Promise.resolve(message.channel.send(embed));
                    }
                }
            }
            if(!hasPokemon) {
                message.reply(`Sorry, <@${message.mentions.users.first().id}> doesn't have a pokemon yet. Type !pokemon without any arugments to see yours!`)
            }
        }
    });
}

export default pokemon;