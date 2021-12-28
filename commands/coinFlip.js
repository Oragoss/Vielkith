import {prefix} from '../config';

const coinFlip = (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if(command === "flip") {
        Promise.resolve(message.channel.send(flip()));
    }
}

const flip = () => {
    let helper = Math.floor(Math.random() * 2 );  //Return a number between 0 and 1
    let answer;
    switch(helper) {
        case 0:
            answer = "Heads";
        break
        case 1:
            answer = "Tails";
        break
    }
    return answer;
}
export default coinFlip;