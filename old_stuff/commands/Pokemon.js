import {prefix, pokemonDataPath} from '../config';
import fetch from 'node-fetch';
import CapitalizeFirstLetter from '../helpers/CapitalizeFirstLetter';
import GetAuthorDisplayName from '../helpers/GetAuthorDisplayName';
const numberOfPokemon = 898;
import RandomColor from '../helpers/RandomColor';
import Discord from 'discord.js';
const fs = require('fs');

const pokemon = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence
    if (command === "pokemon") {
        if(!args[0]) //If the user wants their own pokemon
        { getPokemon(message); }
        else {
            let otherUser = `${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}_${message.guild.id}`;
            getPokemonByUser(message, otherUser);
        }
    }

    // if(command === "encounter" || command === "battle") {
    //     message.delete();
    //     createEncounter(message);
    // }
}

const getPokemon = (message) => {
    fs.readFile(pokemonDataPath, 'utf8', function readFileCallback(err, data) {
        if (err){
            console.log(err);
        } else {
            const displayName = new GetAuthorDisplayName();
            const color = new RandomColor();
            let pokemon = JSON.parse(data);
            let user = `${message.author.username}#${message.author.discriminator}_${message.guild.id}`;
            let hasPokemon = false;
            if(pokemon.length <= 0) {
                addEntry(message, user, pokemon);
                return;
            }
            for(let i = 0; i < pokemon.length; i++) {
                if (user === pokemon[i].user) {
                    hasPokemon = true;
                    let embed = new Discord.MessageEmbed()
                        .setColor(color.randomColor())
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
                        .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                    Promise.resolve(message.channel.send(embed));
                }
            }          
            if(!hasPokemon) {
                addEntry(message, user, pokemon);
                return;
            }
        }
    });
}

const addEntry = (message, user, pokemon) => {
    const newPokemon = Math.floor(Math.random()*numberOfPokemon)
    const cap = new CapitalizeFirstLetter();
    fetch(`https://pokeapi.co/api/v2/pokemon/${newPokemon}`, {credentials:"include"})
    .then(response => response.json())
    .then((result) => {
        let newPokemon = {
            user: user,
            pokemonId: result.id,
            name: cap.capitalizeFirstLetter(result.name),
            sprite: result.sprites.front_default,
            backSprite: result.sprites.back_default,
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
        fs.writeFile(pokemonDataPath, json, 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
            const display = new GetAuthorDisplayName();
            const color = new RandomColor();
            let embed = new Discord.MessageEmbed()
                        .setColor(color.randomColor())
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
                        .setFooter(`Asked by ${display.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
            Promise.resolve(message.channel.send(embed));
        });
    }); 
}

const getPokemonByUser = (message, user) => {
    fs.readFile(pokemonDataPath, 'utf8', function readFileCallback(err, data) {
        if (err){
            console.log(err);
        } else {
            let pokemon = JSON.parse(data);
            const display = new GetAuthorDisplayName();        
            let hasPokemon;
            const color = new RandomColor();
            if(pokemon.length != 0) {
                for(let i = 0; i < pokemon.length; i++) {
                    if (user === pokemon[i].user) {
                        hasPokemon = true;
                        let embed = new Discord.MessageEmbed()
                                    .setColor(color.randomColor())
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
                                    .setFooter(`Asked by ${display.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
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

//TODO: Maybe finish?
// const createEncounter = (message) => {
//     let user = `${message.author.username}#${message.author.discriminator}`;
//     const file = pokemonDataPath;
//     fs.readFile(file, 'utf8', function readFileCallback(err, data) {
//         if (err){
//             console.log(err);
//         } else {
//             let pokemon = JSON.parse(data);
//             if(pokemon.length != 0) {
//                 for(let i = 0; i < pokemon.length; i++) {
//                     if (user === pokemon[i].user) {                        
//                         const newPokemon = Math.floor(Math.random()*numberOfPokemon)
//                         const playerPokemon = pokemon[i];
//                         fetch(`https://pokeapi.co/api/v2/pokemon/${newPokemon}`, {credentials:"include"})
//                         .then(response => response.json())
//                         .then((result) => {
//                             let wildPokemon = {
//                                 pokemonId: result.id,
//                                 name: capitalizeFirstLetter(result.name),
//                                 sprite: result.sprites.front_default,
//                                 hp: result.stats[0].base_stat + Math.floor(Math.random() * ((pokemon[i].level+5) - (pokemon[i].level-5) + 1) + (pokemon[i].level-5)),
//                                 attack: result.stats[1].base_stat + Math.floor(Math.random() * ((pokemon[i].level+5) - (pokemon[i].level-5) + 1) + (pokemon[i].level-5)),
//                                 defense: result.stats[2].base_stat + Math.floor(Math.random() * ((pokemon[i].level+5) - (pokemon[i].level-5) + 1) + (pokemon[i].level-5)),
//                                 specialAttack: result.stats[3].base_stat + Math.floor(Math.random() * ((pokemon[i].level+5) - (pokemon[i].level-5) + 1) + (pokemon[i].level-5)),
//                                 specialDefense: result.stats[4].base_stat + Math.floor(Math.random() * ((pokemon[i].level+5) - (pokemon[i].level-5) + 1) + (pokemon[i].level-5)),
//                                 speed: result.stats[5].base_stat + Math.floor(Math.random() * ((pokemon[i].level+5) - (pokemon[i].level-5) + 1) + (pokemon[i].level-5)),
//                                 exp: result.base_experience * Math.round((1/4 * pokemon[i].level)),
//                                 level: Math.floor(Math.random() * ((pokemon[i].level+5) - (pokemon[i].level-5) + 1) + (pokemon[i].level-5))
//                             }

//                             let wildPokemonMessage = new Discord.MessageEmbed()
//                                             .setColor(randomColor())
//                                             .setDescription(`You encountered a wild ${capitalizeFirstLetter(result.name)}!`)
//                                             .setImage(result.sprites.front_default)
//                             message.author.send(wildPokemonMessage);

//                             let userPokemonMessage = new Discord.MessageEmbed()
//                             .setColor(randomColor())
//                             .setDescription(`${capitalizeFirstLetter(playerPokemon.name)} is going to battle it!`)
//                             .setImage(playerPokemon.backSprite)
//                             message.author.send(userPokemonMessage);

//                             //TODO: make this interactive?
//                             //TODO: Make them battle?
//                             // while(wildPokemon.hp > 0 && playerPokemon.hp) {

//                             // }

//                             // pokemon.push(newPokemon);
//                             // let json = JSON.stringify(pokemon);
//                             // fs.writeFile(pokemonDataPath, json, 'utf8', function(err) {
//                             //     if(err) {
//                             //         return console.log(err);
//                             //     }
//                             //     // console.log(`Added ${user} new pokemon to the roster!\n` + json);
//                             //     let embed = new Discord.MessageEmbed()
//                             //                 .setColor(randomColor())
//                             //                 .setDescription(`Your pokemon is:\n ${newPokemon.name}`)
//                             //                 .setImage(newPokemon.sprite)
//                             //                 .addFields(
//                             //                     {name:"Level", value: newPokemon.level},
//                             //                     {name:"Hp", value: newPokemon.hp},
//                             //                     {name:"Attack", value: newPokemon.attack},
//                             //                     {name:"Defense", value: newPokemon.defense},
//                             //                     {name:"Special Attack", value: newPokemon.specialAttack},
//                             //                     {name:"Special Defense", value: newPokemon.specialDefense},
//                             //                     {name:"Speed", value: newPokemon.speed},
//                             //                 )
//                             //                 .setTimestamp()
//                             //                 .setFooter(`Asked by ${getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
//                             //     Promise.resolve(message.channel.send(embed));
//                             // });
//                         }); 
//                     }
//                 }
//             }
//         }
//     });
// }

// const updateEncounter = (message) => {
//     console.log("here");
//     if(message.guild === null && !message.author.bot){
//         message.reply('hey')
//     }
// }

export default pokemon;