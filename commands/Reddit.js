import {prefix} from '../config';
import splitUrlTitlesAndPhotos from '../tasks/splitUrlTitlesAndPhotos';
import RandomEmoji from '../helpers/RandomEmoji';
import RandomLink from '../helpers/RandomLink';

export default class Reddit {    
    constructor(message) {
        this.message = message; 
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence
        this.randomLink = new RandomLink();
        this.randomEmoji = new RandomEmoji();

        this.funny();
        this.aww();
        this.awful();
        this.awesome();
        this.dndMeme();
        this.cat();
        this.dog();
        this.ferret();
        this.chinchilla();
    }

    funny() {    
        if (this.command === "funny" || this.command === "meme") {
            this.message.react(this.randomEmoji.randomFunnyEmoji());
            splitUrlTitlesAndPhotos(this.randomLink.randomFunnyLink(), this.message);
        }
    }

    aww() {
        if (this.command === "aww") {
            this.message.react(this.randomEmoji.randomAwwEmoji());
            splitUrlTitlesAndPhotos(this.randomLink.randomAwwLink(), this.message);
        }
    }

    awful() {
        if (this.command === "awful") {
            this.message.react(this.randomEmoji.randomAwfulEmoji());
            splitUrlTitlesAndPhotos(this.randomLink.randomAwfulLink(), this.message);
        }
    }

    awesome() {    
        if (this.command === "awesome") {
            splitUrlTitlesAndPhotos(this.randomLink.randomAwesomeLink(), this.message);
        }
    }

    dndMeme() {    
        if (this.command === "dndmeme") {
            this.message.react(randomFunnyEmoji());
            splitUrlTitlesAndPhotos("https://www.reddit.com/r/dndmemes.json", this.message);
        }
    }

    cat() {    
        if (this.command.toLowerCase() === "cat") {
            splitUrlTitlesAndPhotos("https://www.reddit.com/r/cat.json", this.message);
        }
    }

    dog() {
        if (this.command.toLowerCase() === "dog") {
            splitUrlTitlesAndPhotos("https://www.reddit.com/r/dog.json", this.message);
        }
    }

    ferret() {    
        if (this.command.toLowerCase() === "ferret") {
            splitUrlTitlesAndPhotos("https://www.reddit.com/r/ferret.json", this.message);
        }
    }
    
    chinchilla() {    
        if (this.command.toLowerCase() === "chinchilla") {
            splitUrlTitlesAndPhotos("https://www.reddit.com/r/chinchilla.json", this.message);
        }
    }
}