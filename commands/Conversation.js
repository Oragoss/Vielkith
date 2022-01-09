import {prefix} from '../config';
import CapitalizeFirstLetter from '../helpers/CapitalizeFirstLetter';
import fetch from 'node-fetch';
import Discord from 'discord.js';
import RandomColor from '../helpers/RandomColor';
import GetAuthorDisplayName from '../helpers/GetAuthorDisplayName';
import RandomInsult from '../helpers/RandomInsult';
import { lavendria } from '../config';

export default class Conversation {
    constructor(message) {
        this.message = message; 
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence

        this.capitalizeFirstLetter = new CapitalizeFirstLetter();
        this.getAuthorDisplayName = new GetAuthorDisplayName();
        this.randomColor = new RandomColor();
        this.randomInsult = new RandomInsult();

        this.bucky();
        this.advice();
        this.avatar();
        this.mirrormirror();
        this.compliment();
        this.insult();
        this.clap();
    }

    bucky() {
        //TODO: Put Bucky's phrases in here
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
                .setFooter(`${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}`, this.message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))   
                this.message.channel.send(embed)
            //If member wants other people avatar:
            } else {
                this.message.mentions.users.map(user => {
                    this.message.channel.send(new Discord.MessageEmbed()
                    .setColor(this.randomColor.randomColor())
                    .setDescription('<@' + user.id + '>' + `'` +'s profile picture'+' ')
                    .setImage(user.avatarURL())
                    .setTimestamp()
                    .setFooter(`${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}`, this.message.author.avatarURL()));
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

    compliment() {    
        if (this.command === "compliment") {
            fetch("https://complimentr.com/api", {credentials:"include"})
            .then(response => response.json())
            .then((result) => {
                this.message.delete();
                if(!this.args[0]) {
                    let embed = new Discord.MessageEmbed()
                    .setColor(this.randomColor.randomColor())
                    .setDescription(`<@${this.message.author.id}> ${this.capitalizeFirstLetter.capitalizeFirstLetter(result.compliment)}!`)
                    .setTimestamp()
                    .setFooter(`Asked by ${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}. Type !compliment if you'd like one too!`, this.message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))   
                    this.message.channel.send(embed)
                //If member wants to compliment another member:
                } else {
                    this.message.mentions.users.map(user => {
                        this.message.channel.send(new Discord.MessageEmbed()
                        .setColor(this.randomColor.randomColor())
                        .setDescription(`<@${user.id}> ${this.capitalizeFirstLetter.capitalizeFirstLetter(result.compliment)}!`)
                        .setTimestamp()
                        .setFooter(`Sent by ${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}. Type !compliment @${this.message.author.username} to compliment them back!`, this.message.author.avatarURL()));
                    });
                }
            });
        }
    }

    insult() {
        if (this.command === "insult") {
            fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json", {credentials:"include"})
            .then(response => response.json())
            .then((result) => {
                this.message.delete();
                const insult = this.capitalizeFirstLetter.capitalizeFirstLetter(result.insult.replace(/&quot;/g, '\\"'));
                if(!this.args[0]) {
                    let embed = new Discord.MessageEmbed()
                    .setColor(this.randomColor.randomColor())
                    .setDescription(`<@${this.message.author.id}> ${(Math.floor(Math.random() * 100) <= 5) ? this.randomInsult.randomInsult() : insult}`)
                    .setTimestamp()
                    .setFooter(`Asked by ${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}. Type !insult if you'd like one too!`, this.message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))   
                    this.message.channel.send(embed);
                //If member wants to compliment another member:
                } else {
                    this.message.mentions.users.map(user => {
                        this.message.channel.send(new Discord.MessageEmbed()
                        .setColor(this.randomColor.randomColor())
                        .setDescription(`<@${user.id}> ${(Math.floor(Math.random() * 100) <= 5) ? randomInsult() : insult}`)
                        .setTimestamp()
                        .setFooter(`Sent by ${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}. Type !insult @${this.message.author.username} to insult them back!`, this.message.author.avatarURL()));
                    });
                }
            });
        }
    }

    clap() {    
        if (this.command === "clap")  {
            this.message.delete();
            if(!this.args[0]) {
                return this.message.reply("Sincerely or insincerely? I am far too busy to read your mind.\n If you want me to direct the clap at someone mention them with an @.");
            }
            if(!this.args[1]) {
                if(this.args[0] === "sincere" || this.args[0] === "sincerely") {
                    Promise.resolve(this.message.channel.send("Cheers!", {
                        files : [this.clapImages().sincere[this.randomImageSincere()]]
                    }));
                }
                else if(this.args[0] === "insincere" || this.args[0] === "insincerely") {
                    Promise.resolve(this.message.channel.send("Wow...", {
                        files : [this.clapImages().insincere[this.randomImageInsincere()]]
                    }));
                }
            }
            if(this.args[1]) {
                if(this.args[0] === "sincere" || this.args[0] === "sincerely") {
                    const userList = this.message.mentions.users.map(user => {
                        return `${user.username} `;
                    });
                    Promise.resolve(this.message.channel.send(`Cheers, ${userList}!`, {
                        files : [this.clapImages().sincere[this.randomImageSincere()]]
                    }));
                }
                else if(this.args[0] === "insincere" || this.args[0] === "insincerely") {
                    const userList = this.message.mentions.users.map(user => {
                        return `${user.username} `;
                    });
                    Promise.resolve(this.message.channel.send(`${userList}, just... wow.`, {
                        files : [this.clapImages().insincere[this.randomImageInsincere()]]
                    }));
                }
            }
        }
    }
    
    randomImageSincere() {
        let randInt = Math.floor(Math.random() * this.clapImages().sincere.length);  //Return a number between 1 and 3
        return randInt;
    }
    
    randomImageInsincere() {
        let randInt = Math.floor(Math.random() *  this.clapImages().insincere.length)  //Return a number between 1 and 3
        return randInt;
    }
    
    clapImages() {
        return {
            sincere: [
                "http://i.imgur.com/pfrtv6H.gif",
                "http://i.imgur.com/Bp4P8l3.gif",
                "http://i.imgur.com/v7mZ22P.gif",
                "http://i.imgur.com/S1v4KuY.gif",
                "http://i.imgur.com/YTaSAkq.gif",
                "http://i.imgur.com/JO6Wz3r.gif",
                "http://i.imgur.com/pWEd6cF.gif",
                "http://i.imgur.com/zumSlIA.gif",
                "http://i.imgur.com/RGczKmV.gif",
                "http://i.imgur.com/KAQhoCm.gif",
                "http://i.imgur.com/PASRKXo.gif",
                "http://i.imgur.com/ZOWQTO6.gif",
                "http://i.imgur.com/cY0eH5c.gif",
                "http://i.imgur.com/wf5qvOM.gif",
                "http://i.imgur.com/9Zv4V.gif",
                "http://i.imgur.com/t8zvc.gif",
                "http://25.media.tumblr.com/tumblr_m00e9mCyWj1rqtbn0o1_500.gif",
                "http://www.reactiongifs.com/wp-content/uploads/2013/01/applause.gif"
            ],
            insincere: [
                "http://i.imgur.com/2QXgcqP.gif",
                "http://i.imgur.com/Yih2Lcg.gif",
                "http://i.imgur.com/un3MuET.gif",
                "http://i.imgur.com/H2wPc1d.gif",
                "http://i.imgur.com/uOtALBE.gif",
                "http://i.imgur.com/nmqrdiF.gif",
                "http://i.imgur.com/GgxOUGt.gif",
                "http://i.imgur.com/wyTQMD6.gif",
                "http://i.imgur.com/GYRGOy6.gif",
                "http://i.imgur.com/ojIsLUA.gif",
                "http://i.imgur.com/bRetADl.gif",
                "http://i.imgur.com/814mkEC.gif",
                "http://i.imgur.com/uYryMyr.gif",
                "http://i.imgur.com/YfrikPR.gif",
                "http://i.imgur.com/sBEFqYR.gif",
                "http://i.imgur.com/Sx8iAS8.gif",
                "http://i.imgur.com/5zKXz.gif"
            ]
        }
    };
}