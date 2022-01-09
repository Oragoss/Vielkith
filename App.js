import Reddit from './commands/Reddit';

export default class App {    
    constructor(message) {
        this.message = message;
    }

    runCommands() {
        new Reddit(this.message);
    }

    runTasks() {
        
    }
}