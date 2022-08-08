import {prefix, drake, triggerId, comradeChorus} from '../config';
import RandomEmoji from '../helpers/RandomEmoji';
import Discord from 'discord.js';
import RandomColor from '../helpers/RandomColor';

export default class ComradeChorus {
    constructor(message) {
        this.message = message; 
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence

        this.randomEmoji = new RandomEmoji();
        this.randomColor = new RandomColor();

        this.chorus();
    }

    chorus() {
        if(this.message.author.username === triggerId) {
            if(Math.floor(Math.random() * 100) >= 2.5 ) return;
            const iterations = Math.floor(Math.random() * 4) + 1;
            console.log(`\nHow many chorus iterations Drake triggered: ${iterations}`)
            for(let i = 0; i < iterations; i++) {
                this.message.react(this.randomEmoji.randomChorusEmoji())
                let embed = new Discord.MessageEmbed()
                .setColor(this.randomColor.randomColor())
                .setDescription(`I agree with you comrade ${drake}. ${comradeChorus[this.randomMessage()]}`)
                this.message.channel.send(embed)
            }
        }
        if(this.message.author.id === this.message.guild.ownerID && this.command === "drake") {
            const iterations = Math.floor(Math.random() * 4) + 1;
            console.log(`\nHow many chorus iterations you triggered: ${iterations}`)
            for(let i = 0; i < iterations; i++) {
                this.message.react(this.randomEmoji.randomChorusEmoji())
                let embed = new Discord.MessageEmbed()
                .setColor(this.randomColor.randomColor())
                .setDescription(`I agree with you comrade ${drake}. ${comradeChorus[this.randomMessage()]}`)
                //TODO get icon in there
                // .setFooter("", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnewcastlebeach.org%2Fimages%2Fanarchy-symbol-transparent-2.jpg&f=1&nofb=1")
                this.message.channel.send(embed)
            }
        }
    }

    randomMessage() {
        let randInt = Math.floor(Math.random() *  comradeChorus.length)
        return randInt;
    }
}