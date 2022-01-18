import {prefix} from '../config';
const hangman = require('discord-hangman');
import Discord from 'discord.js';

export default class Hangman {
    constructor(message) {
        this.message = message;
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence
    }

    async playHangman() {
        if(this.command === "hangman") {
            if(!this.args[0])
                await hangman.create(this.message.channel, 'random').then(data => {
                    let gameMessage = "";
                    let gameColor = "";
                    if(!data.game) return; // If the game is cancelled or no one joins it
                
                    if (data.game.status === 'won') {
                        if (data.selector){ 
                            gameMessage = `Congratulations, you found the word! ${data.selector.username}`;
                            gameColor = "#00CC00";
                        } else {
                            gameMessage = 'Congratulations you found the word!';
                            gameColor = "#00CC00";
                        }
                    }
                    else if (data.game.status === 'lost') {
                        if (data.selector) {
                            gameMessage = `${data.selector.username} Beat you all! The word was ${data.game.word}.`;
                            gameColor = "#E50000";
                        }
                        
                        else { 
                            gameMessage = `Unfortunately, you lost. The word was ${data.game.word}.`;
                            gameColor = "#E50000";
                        }
                    }
                    else {
                        gameMessage = '15 minutes have passed! The game is over.'; // If no one answers for 15 minutes
                        gameColor = "#cc5806";
                    }

                    let embed = new Discord.MessageEmbed()
                    .setColor(gameColor)
                    .setTitle(gameMessage)
                    .setTimestamp()
                    this.message.channel.send(embed)
                
                });
        }
    }
}