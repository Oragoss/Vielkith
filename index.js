import { prefix, token, owner } from './config.json';

import Discord from 'discord.js';
// import {Player} from 'discord-music-player';

const client = new Discord.Client({
    owner: owner,
});

// const player = new Player(client, {
//     leaveOnEmpty: false, // This options are optional.
// });
// client.player = player;

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
// import playMusic from './commands/playMusic';
import awful from './commands/awful'
import dndMeme from './commands/dndmeme';
import chorus from './commands/chorus';
import pokemon from './commands/pokemon';

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
    chorus(message);
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
    funny(message);
    awful(message);
    dndMeme(message);
    pokemon(message);
    // playMusic(message, client);
});

// Create an event listener for new guild members
client.on('guildMemberAdd', (member) => {
    const greeting = `Hello ${member.user.username}! I am the Sousa Bot! Type ${prefix}help for a list of neat commands.`
    member.createDM(greeting);
});

client.login(token)