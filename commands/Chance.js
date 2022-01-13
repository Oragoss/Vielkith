import {prefix} from '../config';
import Discord from 'discord.js';
import RandomColor from '../helpers/RandomColor';
import GetAuthorDisplayName from '../helpers/GetAuthorDisplayName';

export default class Chance {
    constructor(message) {
        this.message = message; 
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence

        this.getAuthorDisplayName = new GetAuthorDisplayName();
        this.randomColor = new RandomColor();

        this.coinFlip()
        this.roll();
    }

    coinFlip() {    
        if(this.command === "flip") {
            let helper = Math.floor(Math.random() * 2 );  //Return a number between 0 and 1
            let answer;
            switch(helper) {
                case 0:
                    answer = "Heads";
                break
                case 1:
                    answer = "Tails";
                break
            }
            Promise.resolve(this.message.channel.send(answer));
        }
    }

    roll() {
        if(this.command === "roll") {
            let helper = Math.floor(Math.random() * 6 );  //Return a number between 0 and 1
            let answer;
            switch(helper) {
                case 0:
                    answer = "Heads";
                break
                case 1:
                    answer = "Tails";
                break
            }
            let embed = new Discord.MessageEmbed()
            .setColor(this.randomColor.randomColor())
            .setDescription(`${choice[randomInt]}`)
            .setTimestamp()
            .setFooter(`Asked by ${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}`, this.message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
            this.message.channel.send(embed)
        }
    }
}