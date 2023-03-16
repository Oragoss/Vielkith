import {prefix} from '../../config';
import RandomColor from '../../helpers/RandomColor';
import Discord from 'discord.js';
import GetAuthorDisplayName from '../../helpers/GetAuthorDisplayName';

export default class Rest {
    constructor(message) {
        this.message = message;
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence

        this.getAuthorDisplayName = new GetAuthorDisplayName();
        this.randomColor = new RandomColor();

        this.rest();
    }

    rest() {
        if(this.command === "longrest") {
            this.decreaseNumberOfSupplies();
        } else if (this.command === "shortrest") {
            Promise.resolve(this.message.channel.send("short rest"));
        }
    }

    decreaseNumberOfSupplies() {
        const chanceOfRot = 35; //Chance the party has of having their supplies rot.
        const maxAmountLost = 9; //10% because 1 will always be added to prevent 0%
        let randomInt = Math.floor(Math.random() * 100);
        console.log(randomInt);
        let randomAmountLost = Math.floor((Math.random() * maxAmountLost) + 1)

        let embed = new Discord.MessageEmbed()
        .setColor(randomInt < chanceOfRot ? "#FF315A" : "#28A745")
        .setTitle("You check the state of your supplies.")
        .setDescription(randomInt < chanceOfRot ? `${randomAmountLost}% of your perishible goods were lost due to rot.` : 'Everything is good to go, none of your perishable goods have expired.')
        .setTimestamp()
        .setFooter(`Asked by ${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}`, this.message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
        Promise.resolve(this.message.channel.send(embed));
    }
}