import {prefix} from '../config';
import splitUrlTitlesAndPhotos from '../tasks/splitUrlTitlesAndPhotos';

const cat = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command.toLowerCase() === "cat") {
        splitUrlTitlesAndPhotos("https://www.reddit.com/r/cat.json", message);
    }
}
const dog = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command.toLowerCase() === "dog") {
        splitUrlTitlesAndPhotos("https://www.reddit.com/r/dog.json", message);
    }
}
const ferret = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command.toLowerCase() === "ferret") {
        splitUrlTitlesAndPhotos("https://www.reddit.com/r/ferret.json", message);
    }
}

const chinchilla = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command.toLowerCase() === "chinchilla") {
        splitUrlTitlesAndPhotos("https://www.reddit.com/r/chinchilla.json", message);
    }
}

module.exports = {
    cat,
    dog,
    ferret,
    chinchilla
}