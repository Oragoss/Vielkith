import {prefix} from '../config';
import splitUrlTitlesAndPhotos from '../tasks/splitUrlTitlesAndPhotos';

const dndMeme = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "dndMeme" || command === "dndmeme") {
        splitUrlTitlesAndPhotos("https://www.reddit.com/r/dndmemes.json", message);
    }
}

export default dndMeme;