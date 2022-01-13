import {prefix} from './config';
import Reddit from './commands/Reddit';
import Conversation from './commands/Conversation';
import Chance from './commands/Chance';
import Information from './commands/Information';
import Pokemon from './commands/Pokemon';
import ComradeChorus from './tasks/ComradeChorus';
import GainPokemonExp from './tasks/GainPokemonExp';
import NewsUpdate from './tasks/NewsUpdate';

export default class App {    
    constructor() {
        // message = message;
        // this.oldMessage = oldMessage;   //This is used for edited or updated messages that have already been sent
    }

    runCommands(message = null, oldMessage = null) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        new Reddit(message);
        new Conversation(message);
        new Chance(message);
        new Information(message);
        new Pokemon(message);
    }

    runTasks(message = null, oldMessage = null) {
        if (message.author.bot) return;
        new ComradeChorus(message);
        new GainPokemonExp(message);
    }

    runTasksOnStartup(client) {
        const newsUpdate = new NewsUpdate(client);
        newsUpdate.update(client);
    }
}