import Discord from 'discord.js'
import { lavendria } from '../config';

const hello = (message) => {
    let command = message.content.replace('!', '')

    switch(command) {
        case 'mirrormirror':
            message.channel.send(`Why, ${lavendria} is the fairest of them all.`)
        break
    }
}

module.exports = hello