import { token, owner } from './config.json';
import Discord from 'discord.js';
import RandomColor from './helpers/RandomColor';
import App from './App';

//https://discordjs.guide/popular-topics/intents.html#enabling-intents
//TODO: upgrade to use indents
const client = new Discord.Client({
    owner: owner,
});

let clientMessage;
const app = new App();

//WHOOOOOOOOOOOOOO!

process.on('uncaughtException', async err => {
    console.error('There was an uncaught error', err)
    await client.destroy();
    client.login(token);

    const color = new RandomColor();

    const embed = new Discord.MessageEmbed()
    .setColor(color.randomColor())
    .setDescription(`A wild error appeared! Please try your command again.`)
    .setTimestamp()
    clientMessage.channel.send(embed)
});

const runCommandsAndTasks = async (message, oldMessage = null) => {
    clientMessage = message;
    
    app.runTasks(message, oldMessage);
    app.runCommands(message, oldMessage);
    app.runAsyncCommands(message, oldMessage);
    app.runTasksOnStartup(client);
    await app.runHangman(message);
}

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('ready', () => {
    console.log('Logged in as ' + client.user.username + '!');
    client.user.setActivity('Pokemon');

    app.runTasksOnStartup(client);
});

client.on('message', async message => {
    runCommandsAndTasks(message);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    runCommandsAndTasks(newMessage, oldMessage);
});

client.login(token)