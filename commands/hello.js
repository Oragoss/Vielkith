import Discord from 'discord.js'

const hello = (message) => {
    let command = message.content.replace('!', '')
    switch(command) {
        case 'hello':
            message.reply('Hello there! Welcome to the Sousa channel, how may I be of assistance?')
            // message.member.send("Heya!");
        break
    }
}

module.exports = hello