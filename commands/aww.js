import {prefix} from '../config';
import fetch from 'node-fetch';

const aww = (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "aww") {
        fetch("https://www.reddit.com/r/aww.json", {credentials:"include"})
        .then(response => response.json())
        .then((result) => {
            let titles = [];
            let urls  = [];

            for (let i = 0; i < result.data.children.length; i++) {
                titles.push(result.data.children[i].data.title);
                urls.push(result.data.children[i].data.url);
            }

            if(urls.length <= 0) {
                return message.channel.send("Couldn't find any images.");
            }

            let rnd = Math.floor(Math.random()*urls.length)
            Promise.resolve(message.channel.send(`${titles[rnd]}`, {
                files : [urls[rnd]]
            }));
        });
    }
}

export default aww;