import {prefix} from '../config';
import splitUrlTitlesAndPhotos from '../tasks/splitUrlTitlesAndPhotos';
import { randomAwfulEmoji } from '../tasks/randomEmoji';

const awful = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "awful") {
        message.react(randomAwfulEmoji());
        splitUrlTitlesAndPhotos(randomAwfulLink(), message);
    }
}

const randomAwfulLink = () => {    
    const thanksIHateIt = "https://www.reddit.com/r/TIHI.json";
    const wtf = "https://www.reddit.com/r/wtf.json";
    const trashy = "https://www.reddit.com/r/trashy.json";
    const awfulEverything = "https://www.reddit.com/r/awfuleverything.json";    
    const cringetopia = "https://www.reddit.com/r/Cringetopia.json";
    const justNeckBeardThings = "https://www.reddit.com/r/justneckbeardthings.json";
    const atbe = "https://www.reddit.com/r/ATBGE.json";
    const wellThatSucks = "https://www.reddit.com/r/WellThatSucks.json";
    const popping = "https://www.reddit.com/r/popping.json";
    const choice = [popping, wellThatSucks, atbe, justNeckBeardThings, cringetopia, thanksIHateIt, wtf, trashy, awfulEverything];
    let randomInt = Math.floor(Math.random() * choice.length);
    return choice[randomInt];
}

export default awful;