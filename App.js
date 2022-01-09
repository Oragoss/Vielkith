import Reddit from './commands/Reddit';

export default class App {    
    constructor(message) {
        this.message = message;
    }

    runCommands() {
        let reddit = new Reddit(this.message);
        reddit.funny();
    }
}