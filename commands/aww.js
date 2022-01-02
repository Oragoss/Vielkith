import {prefix} from '../config';
import splitUrlTitlesAndPhotos from '../tasks/splitUrlTitlesAndPhotos';
import { randomAwwEmoji } from '../tasks/randomEmoji';

const aww = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "aww") {
        message.react(randomAwwEmoji());
        splitUrlTitlesAndPhotos(randomAwwLink(), message);
    }
}

const randomAwwLink = () => {    
    const aww = "https://www.reddit.com/r/aww.json";
    const wholesomeMemes = "https://www.reddit.com/r/wholesomeMemes.json";
    const eyebleach = "https://www.reddit.com/r/eyebleach.json";
    const hardcoreaww = "https://www.reddit.com/r/hardcoreaww.json";
    const choice = [aww, wholesomeMemes, eyebleach, hardcoreaww];
    let randomInt = Math.floor(Math.random() * choice.length);
    return choice[randomInt];
}

export default aww;