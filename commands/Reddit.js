import {prefix} from '../config';
import splitUrlTitlesAndPhotos from '../tasks/splitUrlTitlesAndPhotos';
import { randomFunnyEmoji } from '../tasks/randomEmoji';

export default class Reddit {    
    constructor(message) {
        this.message = message;
    }

    funny() {
        const args =  this.message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase(); //The first word in the command sentence
    
        if (command === "funny" || command === "meme") {
            this.message.react(randomFunnyEmoji());
            splitUrlTitlesAndPhotos(this.randomFunnyLink(), this.message);
        }
    }
    
    randomFunnyLink() {
        const funny = "https://www.reddit.com/r/funny.json";
        const memes = "https://www.reddit.com/r/memes.json";
        const dankmemes = "https://www.reddit.com/r/dankmemes.json";
        const lotrmemes = "https://www.reddit.com/r/lotrmemes.json";
        const prequelMemes = "https://www.reddit.com/r/PrequelMemes.json";
        const politicalhumor = "https://www.reddit.com/r/PoliticalHumor.json";
        const memeEconomy = "https://www.reddit.com/r/MemeEconomy.json";
        const adviceAnimals = "https://www.reddit.com/r/AdviceAnimals.json";
        const wallstreetBets = "https://www.reddit.com/r/wallstreetbets.json";
        const choice = [wallstreetBets, adviceAnimals, funny, memes, dankmemes, lotrmemes, prequelMemes, politicalhumor, memeEconomy];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
    }
}