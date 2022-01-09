import { token, owner } from './config.json';

import Discord from 'discord.js';
import randomColor from './tasks/setRandomColor';
//Commands
import chorus from './tasks/chorus';
import pokemon from './commands/pokemon';
import gainPokemonExp from './tasks/gainPokemonExp';

import App from './App';

const client = new Discord.Client({
    owner: owner,
});

let clientMessage;

process.on('uncaughtException', async err => {
    console.error('There was an uncaught error', err)
    await client.destroy();
    client.login(token);

    let embed = new Discord.MessageEmbed()
    .setColor(randomColor())
    .setDescription(`A wild error appeared! Please try your command again.`)
    .setTimestamp()
    clientMessage.channel.send(embed)
});

const runCommandsAndTasks = async (message, oldMessage = null) => {
    clientMessage = message;
    //Tasks
    // chorus(message);
    // gainPokemonExp(message);

    let app = new App(message, oldMessage);
    app.runTasks();
    app.runCommands();
    
    
    
    //Commands
    // mirrormirror(message);
    // insult(message);
    // join(message);
    // serverInfo(message);
    // help(message);
    // rank(message);
    // coinFlip(message);
    // clap(message);
    // changeRole(message);
    // pokemon(message);
    // dictionary(message);
    // compliment(message);
}

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('ready', () => {
    console.log('Logged in as ' + client.user.username + '!');
    client.user.setActivity('NotSpyingOnYou');
});

client.on('message', async message => {
    runCommandsAndTasks(message);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    runCommandsAndTasks(newMessage, oldMessage);
});

client.login(token)