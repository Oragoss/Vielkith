import {prefix} from '../config';
import splitUrlTitlesAndPhotos from '../tasks/splitUrlTitlesAndPhotos';

const funny = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "funny") {
        splitUrlTitlesAndPhotos("https://www.reddit.com/r/funny.json", message);
    }
}

export default funny;