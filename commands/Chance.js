import {prefix} from '../config';

export default class Chance {
    constructor(message) {
        this.message = message; 
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence

        this.coinFlip()
        this.roll();
    }

    coinFlip() {    
        if(this.command === "flip") {
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
            Promise.resolve(this.message.channel.send(answer));
        }
    }

    roll() {
        //TODO: Roll a die
    }
}