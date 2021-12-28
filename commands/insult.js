import {prefix} from '../config';

const insult = (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "insult")  {

        if(!args[0]) {
            Promise.resolve(message.reply(randomInsult()));
        }
        else {
            const userList = message.mentions.users.map(user => {
                return `${user.username}, ${randomInsult()}`;
            });
            Promise.resolve(message.channel.send(userList));
        }
    }
}


const randomInsult = () => {
    let helper = Math.floor(Math.random() * 4) + 1  //Return a number between 1 and 3
    let insult = "No insult processed.";
    switch(helper) {
        case 1:
            insult = "Your mother was a murloc!";
        break
        case 2:
            insult = "Your processing power is limited!";
        break
        case 3:
            insult = "It takes you more than 3000 miliseconds to solve a math problem."
        break
        case 4:
            insult = "You'd make an orc look pretty."
        break
    }

    return insult;
}

export default insult;