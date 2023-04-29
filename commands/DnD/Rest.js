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
        this.red = "#FF315A";
        this.green = "#28A745";

        this.rest();
    }

    rest() {
        if(this.command === "longrest") {
            this.decreaseNumberOfSupplies();
            this.determineWeather();
        } else if (this.command === "shortrest") {
            Promise.resolve(this.message.channel.send("short rest"));
        }
    }

    decreaseNumberOfSupplies() {
        const chanceOfRot = 35; //Chance the party has of having their supplies rot.
        const maxAmountLost = 9; //10% because 1 will always be added to prevent 0%
        let randomInt = Math.floor(Math.random() * 100);
        let randomAmountLost = Math.floor((Math.random() * maxAmountLost) + 1)

        let embed = new Discord.MessageEmbed()
        .setColor(randomInt < chanceOfRot ? this.red : this.green)
        .setTitle("You check the state of your supplies.")
        .setDescription(randomInt < chanceOfRot ? `${randomAmountLost}% of your perishible goods were lost due to rot.` : 'Everything is good to go, none of your perishable goods have expired.')
        .setTimestamp()
        .setFooter(`Asked by ${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}`, this.message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
        Promise.resolve(this.message.channel.send(embed));
    }

    determineWeather() {
        const goodWeatherConditions = [
            "Looks like today there will be clear skies. Your travel speed is not impeded.",
            "It's cloudy today, it might rain tomorrow. Your travel speed is not impeded.",
            "You can hear the howling wind. Your travel speed is not impeded, but be careful not to lose your hat!",
            "It's a calm rainy morning. As long as your careful you've nothing to worry about."
        ];
        const badWeatherConditions = [
            "You can feel the cold front. You will make attack and spell attack rolls with disadvantage today.",
            "You hear the hail as you awake this morning. Your travel speed is halved, and during combat you take 1d4 bludgening damage per round while not under cover.",
            "It's as if rivers are being poured out of the sky! Your travel speed is halved",
        ];

        const threshold = 85;
        let randomInt = Math.floor(Math.random() * 100);
        console.log(`The weather roll is: ${randomInt}\n The threshold is: ${threshold}`);
        const condition = randomInt < threshold ? goodWeatherConditions[Math.floor(Math.random() * goodWeatherConditions.length)] : badWeatherConditions[Math.floor(Math.random() * badWeatherConditions.length)];

        let embed = new Discord.MessageEmbed()
        .setColor(randomInt < threshold ? this.green : this.red)
        .setTitle("You check the weather.")
        .setDescription(`${condition}`)
        .setTimestamp()
        .setFooter(`Asked by ${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}`, this.message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
        Promise.resolve(this.message.channel.send(embed));
    }
}