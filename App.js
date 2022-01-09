import {prefix} from './config';
import Reddit from './commands/Reddit';
import Conversation from './commands/Conversation';
import Chance from './commands/Chance';
import Information from './commands/Information';
import Pokemon from './commands/Pokemon';

// import chorus from './tasks/chorus';
import Chorus from './tasks/Chorus';
import gainPokemonExp from './tasks/gainPokemonExp';

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
        // chorus(this.message);
        new Chorus(this.message);
        gainPokemonExp(this.message);
    }
}