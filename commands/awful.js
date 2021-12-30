import {prefix} from '../config';
import splitUrlTitlesAndPhotos from '../tasks/splitUrlTitlesAndPhotos';

const awful = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "awful") {
        splitUrlTitlesAndPhotos(randomAwfulLink(), message);
    }
}

const randomAwfulLink = () => {    
    const thanksIHateIt = "https://www.reddit.com/r/TIHI.json";
    const wtf = "https://www.reddit.com/r/wtf.json";
    const trashy = "https://www.reddit.com/r/trashy.json";
    const choice = [thanksIHateIt, wtf, trashy];
    let randomInt = Math.floor(Math.random() * choice.length);
    return choice[randomInt];
}

export default awful;