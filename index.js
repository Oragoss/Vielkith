import { prefix, token, owner } from './config.json';

import Discord from 'discord.js';
import randomColor from './tasks/setRandomColor';
//Commands
import mirrormirror from './commands/mirrormirror';
import insult from './commands/insult';
import serverInfo from './commands/serverInfo';
import help from './commands/help';
import avatar from './commands/avatar';
import join from './commands/join';
import rank from './commands/rank';
import coinFlip from './commands/coinFlip';
import clap from './commands/clap';
import advice from './commands/advice';
import aww from './commands/aww';
import changeRole from './commands/changeRole';
import funny from './commands/funny';
import awful from './commands/awful'
import dndMeme from './commands/dndmeme';
import chorus from './tasks/chorus';
import pokemon from './commands/pokemon';
import { cat, dog, ferret, chinchilla } from './commands/pet';
import dictionary from './commands/dictionary';
import gainPokemonExp from './tasks/gainPokemonExp';
import compliment from './commands/compliment';
import awesome from './commands/awesome';

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

const commandsAndTasks = async (message, oldMessage = null) => {
    clientMessage = message;
    //Tasks
    chorus(message);
    gainPokemonExp(message);

    let app = new App(message);
    app.runCommands();
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    //Commands
    mirrormirror(message);
    insult(message);
    join(message);
    serverInfo(message);
    help(message);
    avatar(message);
    rank(message);
    coinFlip(message);
    clap(message);
    advice(message);
    aww(message);
    changeRole(message);
    // funny(message);
    awful(message);
    dndMeme(message);
    pokemon(message);
    cat(message);
    dog(message);
    ferret(message);
    chinchilla(message);
    dictionary(message);
    compliment(message);
    awesome(message);
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
    commandsAndTasks(message);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    commandsAndTasks(newMessage);
});

client.login(token)