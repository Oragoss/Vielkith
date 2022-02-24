import { pokemonDataPath } from '../config.json';
const fs = require('fs');

export default class GainPokemonExp {
    constructor(message) {
        this.message = message;

        this.gainPokemonExp(this.message);
    }

    gainPokemonExp(message) {
        const user = `${message.author.username}#${message.author.discriminator}_${message.guild.id}`;
        const file = pokemonDataPath;
        fs.readFile(file, 'utf8', function readFileCallback(err, data) {
            if (err){
                console.log(err);
            } else {
                let pokemon = JSON.parse(data);
                console.log(user);
                const expGain = message.content.length * 0.085;  //how much exp a user's pokemon gets per character
                const expLimit = 12  //This is multiplied by the pokemon's current level to determine how much exp is needed before a level up
                if(pokemon.length != 0) {
                    for(let i = 0; i < pokemon.length; i++) {
                        if (user === pokemon[i].user) {
                            pokemon[i].exp += expGain;
                            console.log("\n" + `${pokemon[i].user}'s ` + pokemon[i].name + " current xp: " + pokemon[i].exp)
                            console.log(pokemon[i].name + " : " + (expGain) + " gained!")
                            if(pokemon[i].exp >= (pokemon[i].level * expLimit))
                            {
                                pokemon[i] = levelup(pokemon[i]);
                                message.author.send(`Your pokemon ${pokemon[i].name} leveled up to ${pokemon[i].level}!`);
                            }
    
                            let json = JSON.stringify(pokemon);
                            fs.writeFile(file, json, 'utf8', function(err) {
                                if(err) {
                                    return console.log(err);
                                }
                            });
                        }
                    }
                }
            }
        });
    }
}

const levelup = (pokemon) => {
    const maxValue = 5;
    pokemon.level++
    pokemon.exp = 0;
    pokemon.hp += (Math.floor(Math.random() * maxValue));
    pokemon.attack += (Math.floor(Math.random() * maxValue));
    pokemon.defense += (Math.floor(Math.random() * maxValue));
    pokemon.specialAttack += (Math.floor(Math.random() * maxValue));
    pokemon.specialDefense += (Math.floor(Math.random() * maxValue));
    pokemon.speed += (Math.floor(Math.random() * maxValue));

    return pokemon;
}