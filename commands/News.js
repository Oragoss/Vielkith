import {prefix, newsApiKey} from '../config';
import RandomLink from '../helpers/RandomLink';
import fetch from 'node-fetch';

export default class News {
    constructor() {
        // this.message = message;
        // this.args = this.message.content.slice(prefix.length).split(/ +/);  //arguments that follow the command
        // this.command = this.args.shift().toLowerCase(); //The first word in the command sentence
        
    }

    getNews(message) {
        const args = this.message.content.slice(prefix.length).split(/ +/);  //arguments that follow the command
        const command = this.args.shift().toLowerCase(); //The first word in the command sentence
        if (command === "news") {
            fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${newsApiKey}`, {credentials:"include"})
            .then(response => response.json())
            .then((result) => {

                //TODO: THIS
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
    };
}