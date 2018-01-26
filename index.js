require('dotenv').config()

import Discord from 'discord.js'

import hello from './commands/hello'
import mirrormirror from './commands/mirrormirror'

const client = new Discord.Client({
    owner: process.env.CLIENT_OWNER,
})


client.on('ready', () => {
    console.log('Logged in as ' + client.user.username + '!');
    client.user.setActivity('ChannelBot');
});

client.on('message', (message) => {
    hello(message)
    mirrormirror(message)
})

client.login(process.env.BOT_TOKEN)