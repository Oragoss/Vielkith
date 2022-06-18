import {prefix} from './config';
import Reddit from './commands/Reddit';
import Conversation from './commands/Conversation';
import Chance from './commands/Chance';
import Information from './commands/Information';
import ComradeChorus from './tasks/ComradeChorus';
import GainPokemonExp from './tasks/GainPokemonExp';
import NewsUpdate from './tasks/NewsUpdate';
import News from './commands/News';
import Hangman from './commands/Hangman';
import Game from './commands/Game';
import pokemon from './commands/Pokemon';
import Poll from './commands/Poll';
import AdviceUpdate from './tasks/AdviceUpdate';
import roll from './commands/Roll'

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
        pokemon(message);
        roll(message);
     
        const news = new News();
        news.getNews(message); //maybe turn this back on
    }

    async runAsyncCommands(message = null, oldMessage = null) {
        // const game = new Game();
        // await game.rockPaperScissors(message);

        const poll = new Poll();
        await poll.startPoll(message);
    }

    runTasks(message = null, oldMessage = null) {
        if (message.author.bot) return;
        new ComradeChorus(message);
        new GainPokemonExp(message);
    }

    async runHangman(message = null) {
        const hm = new Hangman(message);
        await hm.playHangman();
    }

    runTasksOnStartup(client) {
        const newsUpdate = new NewsUpdate(client);
        newsUpdate.update(client);

        const adviceUpdate = new AdviceUpdate(client);
        adviceUpdate.update(client);
    }
}