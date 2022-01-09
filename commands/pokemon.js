import {prefix, pokemonDataPath} from '../config';
import fetch from 'node-fetch';
import CapitalizeFirstLetter from '../helpers/CapitalizeFirstLetter';
import RandomColor from '../helpers/RandomColor';
import GetAuthorDisplayName from '../helpers/GetAuthorDisplayName';
import Discord from 'discord.js';
const fs = require('fs');

export default class Pokemon {
    constructor(message) {
        this.message = message; 
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence
        this.numberOfPokemon = 898;

        this.capitalizeFirstLetter = new CapitalizeFirstLetter();
        this.getAuthorDisplayName = new GetAuthorDisplayName();
        this.randomColor = new RandomColor();

        this.pokemon();
    }

    pokemon() {
        if (this.command === "pokemon") {
            if(!this.args[0]) //If the user wants their own pokemon
            { this.getPokemon(this.message); }
            else {
                let otherUser = `${this.message.mentions.users.first().username}#${this.message.mentions.users.first().discriminator}`;
                this.getPokemonByUser(this.message, otherUser);
            }
        }
    }

    getPokemon(message) {
        let color = new RandomColor();
        let displayAuthor = new GetAuthorDisplayName();
        fs.readFile(pokemonDataPath, 'utf8', function readFileCallback(err, data) {
            if (err){
                console.log(err);
            } else {
                let pokemon = JSON.parse(data);
                
                let user = `${message.author.username}#${message.author.discriminator}`;
                let hasPokemon = false;
                if(pokemon.length <= 0)
                    addEntry(user, pokemon);
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
                            .setFooter(`Asked by ${displayAuthor.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                        Promise.resolve(message.channel.send(embed));
                    }
                }          
                if(!hasPokemon) {
                    addEntry(user, pokemon);
                }
            }
        });
    }

    addEntry(message, user, pokemon) {
        let color = new RandomColor();
        let displayAuthor = new GetAuthorDisplayName();
        const newPokemon = Math.floor(Math.random() * this.numberOfPokemon)
        fetch(`https://pokeapi.co/api/v2/pokemon/${newPokemon}`, {credentials:"include"})
        .then(response => response.json())
        .then((result) => {
            let newPokemon = {
                user: user,
                pokemonId: result.id,
                name: capitalizeFirstLetter(result.name),
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
                // console.log(`Added ${user} new pokemon to the roster!\n` + json);
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
                            .setFooter(`Asked by ${displayAuthor.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                Promise.resolve(message.channel.send(embed));
            });
        }); 
    }

    getPokemonByUser(message, user) {
        let color = new RandomColor();
        let displayAuthor = new GetAuthorDisplayName();
        fs.readFile(pokemonDataPath, 'utf8', function readFileCallback(err, data) {
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
                                        .setFooter(`Asked by ${displayAuthor.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
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
}