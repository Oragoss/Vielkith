import Discord from 'discord.js'

const hello = (message) => {
    let command = message.content.replace('!', '')
    const maiden = process.env.FAIR_MAIDEN

    switch(command) {
        case 'mirrormirror':
            message.channel.send(`Why, ${maiden} is the fairest of them all.`)
        break
    }
}

module.exports = hello