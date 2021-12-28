import Discord from 'discord.js'

//TODO: Make this work again
const randomGreeting = () => {
    let helper = Math.floor(Math.random() * 3) + 1  //Return a number between 1 and 3
    switch(helper) {
        case 1:
            "Well, hello there!"
        break
        case 2:
            "Hi!"
        break
        case 3:
            "No."
        break
    }
}

const sayHello = (message) => {
    let command = message.content.replace('!', '')
    if(message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Mod")) {
        message.reply("JP!");
    }
    switch(command) {
        case 'sayHello':
            // message.reply(Promise.resolve(randomGreeting()));
            message.reply("Well, hello there!");
        break
    }
}

module.exports = sayHello