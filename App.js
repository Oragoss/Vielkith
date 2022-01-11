import {prefix} from './config';
import Reddit from './commands/Reddit';
import Conversation from './commands/Conversation';
import Chance from './commands/Chance';
import Information from './commands/Information';
import Pokemon from './commands/Pokemon';
import ComradeChorus from './tasks/ComradeChorus';
import GainPokemonExp from './tasks/GainPokemonExp';

export default class App {    
    constructor(message, oldMessage) {
        this.message = message;
        this.oldMessage = oldMessage;   //This is used for edited or updated messages that have already been sent
    }

    runCommands() {
        if (!this.message.content.startsWith(prefix) || this.message.author.bot) return;
        new Reddit(this.message);
        new Conversation(this.message);
        new Chance(this.message);
        new Information(this.message);
        new Pokemon(this.message);
    }

    runTasks() {
        if (this.message.author.bot) return;
        new ComradeChorus(this.message);
        new GainPokemonExp(this.message);
    }
}