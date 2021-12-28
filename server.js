import { prefix, token, owner } from './config.json';

import Discord from 'discord.js';

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

//Tasks

const bot = new Discord.Client({
    owner: owner,
});


bot.on('ready', () => {
    console.log('Logged in as ' + bot.user.username + '!');
    bot.user.setActivity('NotSpyingOnYou');
});

bot.on('message', async message => {
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
    //Tasks
});

// Create an event listener for new guild members
bot.on('guildMemberAdd', (member) => {
    const greeting = `Hello ${member.user.username}! I am the Sousa Bot! Type ${prefix}help for a list of neat commands.`
    member.createDM(greeting);
});

bot.login(token)