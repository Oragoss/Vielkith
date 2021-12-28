import { prefix } from '../config.json';

const serverInfo = (message) => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

     if (command === 'server') {
        if (!args.length) {
            return message.reply(`You didn't provide any arguments!\n\n Arguments for ${prefix}server:\n --info`);
        }
        if(args[0] === 'info'){
            return message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
        }
        if(args[0] === 'help'){
            return message.channel.send(`Type '$help' for help using this bot.`);
        }
        else {
           return message.reply(`Arguments for ${prefix}server:\n --info`);
        }
    }
}

export default serverInfo;