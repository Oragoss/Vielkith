import {prefix} from '../config';
import CapitalizeFirstLetter from '../helpers/CapitalizeFirstLetter';
import fetch from 'node-fetch';
import Discord from 'discord.js';
import RandomColor from '../helpers/RandomColor';
import GetAuthorDisplayName from '../helpers/GetAuthorDisplayName';
import { lavendria } from '../config';

export default class Conversation {
    constructor(message) {
        this.message = message; 
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence

        this.capitalizeFirstLetter = new CapitalizeFirstLetter();
        this.getAuthorDisplayName = new GetAuthorDisplayName();
        this.randomColor = new RandomColor();

        this.advice();
        this.avatar();
        this.mirrormirror();
    }

    advice() {    
        if (this.command === "advice") {
            this.message.delete();
            fetch("http://api.adviceslip.com/advice", {credentials:"include"})
            .then(response => response.json())
            .then((result) => {
                let embed = new Discord.MessageEmbed()
                .setColor(this.randomColor.randomColor())
                .setDescription(result.slip.advice)
                .setTimestamp()
                .setFooter(`Asked by ${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}`, this.message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))   
                this.message.reply(embed)
            });
        }
    }

    avatar() {    
        if(this.command === 'avatar') {
            //If member wants his own avatar
            if(!this.args[0]) {
                let embed = new Discord.MessageEmbed()
                .setColor(this.randomColor.randomColor())
                .setDescription('<@' + this.message.author.id + '>' + `'` +'s profile picture')
                .setImage(this.message.author.avatarURL())
                .setTimestamp()
                .setFooter(`${this.message.author.username}`, this.message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))   
                this.message.channel.send(embed)
            //If member wants other people avatar:
            } else {
                this.message.mentions.users.map(user => {
                    this.message.channel.send(new Discord.MessageEmbed()
                    .setColor(this.randomColor.randomColor())
                    .setDescription('<@' + user.id + '>' + `'` +'s profile picture'+' ')
                    .setImage(user.avatarURL())
                    .setTimestamp()
                    .setFooter(`${this.message.author.username}`, this.message.author.avatarURL()));
                });
            }
        }
    }

    mirrormirror() {
        switch(this.command) {
            case 'mirrormirror':
                this.message.channel.send(`Why, ${lavendria} is the fairest of them all.`)
            break
        }
    }
}