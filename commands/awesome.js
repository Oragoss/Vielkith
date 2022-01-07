import {prefix} from '../config';
import splitUrlTitlesAndPhotos from '../tasks/splitUrlTitlesAndPhotos';

const awesome = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "awesome") {
        splitUrlTitlesAndPhotos(randomAwesomeLink(), message);
    }
}

const randomAwesomeLink = () => {
    const natureisfuckinglit = "https://www.reddit.com/r/natureisfuckinglit.json";
    const earthPorn = "https://www.reddit.com/r/earthporn.json";
    const spacePorn = "https://www.reddit.com/r/spaceporn.json";
    const solarPunkPorn = "https://www.reddit.com/r/solarpunkporn.json";
    const natureIsMetal = "https://www.reddit.com/r/natureismetal.json";
    const choice = [natureisfuckinglit, natureIsMetal, earthPorn, spacePorn, solarPunkPorn];
    let randomInt = Math.floor(Math.random() * choice.length);
    return choice[randomInt];
}

export default awesome;