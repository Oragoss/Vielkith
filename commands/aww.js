import {prefix} from '../config';
import splitUrlTitlesAndPhotos from '../tasks/splitUrlTitlesAndPhotos';

const aww = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "aww") {
        splitUrlTitlesAndPhotos("https://www.reddit.com/r/aww.json", message);
    }
}

export default aww;