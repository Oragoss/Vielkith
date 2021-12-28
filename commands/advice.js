import {prefix} from '../config';
import fetch from 'node-fetch';

const advice = (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "advice") {
        fetch("http://api.adviceslip.com/advice", {credentials:"include"})
        .then(response => response.json())
        .then((result) => {
            Promise.resolve(message.reply(result.slip.advice));
        });
    }
}

export default advice;