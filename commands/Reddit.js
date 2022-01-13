import {prefix} from '../config';
import SplitUrlTitlesAndPhotos from '../helpers/SplitUrlTitlesAndPhotos';
import RandomEmoji from '../helpers/RandomEmoji';
import RandomLink from '../helpers/RandomLink';
import fetch from 'node-fetch';

export default class Reddit {    
    constructor(message) {
        this.message = message; 
        this.args = this.message.content.slice(prefix.length).split(/ +/);  //arguments that follow the command
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence
        this.randomLink = new RandomLink();
        this.randomEmoji = new RandomEmoji();
        this.splitUrlTitlesAndPhotos = new SplitUrlTitlesAndPhotos();

        this.funny();
        this.aww();
        this.awful();
        this.awesome();
        this.dndMeme();
        this.cat();
        this.dog();
        this.ferret();
        this.chinchilla();
        this.todayILearned();
    }

    funny() {    
        if (this.command === "funny" || this.command === "meme") {
            this.message.react(this.randomEmoji.randomFunnyEmoji());
            this.splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos(this.randomLink.randomFunnyLink(), this.message);
        }
    }

    aww() {
        if (this.command === "aww") {
            this.message.react(this.randomEmoji.randomAwwEmoji());
            this.splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos(this.randomLink.randomAwwLink(), this.message);
        }
    }

    awful() {
        if (this.command === "awful") {
            this.message.react(this.randomEmoji.randomAwfulEmoji());
            this.splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos(this.randomLink.randomAwfulLink(), this.message);
        }
    }

    awesome() {    
        if (this.command === "awesome") {
            this.splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos(this.randomLink.randomAwesomeLink(), this.message);
        }
    }

    dndMeme() {    
        if (this.command === "dndmeme") {
            this.message.react(this.randomEmoji.randomFunnyEmoji());
            this.splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos("https://www.reddit.com/r/dndmemes.json", this.message);
        }
    }

    cat() {    
        if (this.command.toLowerCase() === "cat") {
            this.splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos("https://www.reddit.com/r/cat.json", this.message);
        }
    }

    dog() {
        if (this.command.toLowerCase() === "dog") {
            this.splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos("https://www.reddit.com/r/dog.json", this.message);
        }
    }

    ferret() {    
        if (this.command.toLowerCase() === "ferret") {
            this.splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos("https://www.reddit.com/r/ferret.json", this.message);
        }
    }
    
    chinchilla() {    
        if (this.command.toLowerCase() === "chinchilla") {
            this.splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos("https://www.reddit.com/r/chinchilla.json", this.message);
        }
    }

    todayILearned() {
        if (this.command.toLowerCase() === "til" || this.command.toLowerCase() === "todayilearned") {
            fetch("https://www.reddit.com/r/todayilearned.json", {credentials:"include"})
            .then(response => response.json())
            .then((result) => {
                    let pics = [{
                        title: "",
                        url: ""
                    }];
                    
                    for (let i = 0; i < result.data.children.length; i++) {
                        let data = result.data.children[i].data;                
                        if((data.thumbnail.split('.').pop() === 'jpg') || (data.thumbnail.split('.').pop() === 'png') || (data.thumbnail.split('.').pop() === 'gif')) {
                            pics.push({title: data.title, url: data.url});
                        }
                    }
            
                    if(pics.length <= 0) {
                        return this.message.channel.send("Couldn't find any posts.");
                    }
            
                    let rnd = Math.floor(Math.random()*pics.length);
                    this.message.delete();
                    Promise.resolve(this.message.channel.send(`${pics[rnd].title} \n ${pics[rnd].url}`));
                });
        }
    }
}