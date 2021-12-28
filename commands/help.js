import { prefix } from '../config.json';
import Discord from 'discord.js';

let description = `Enter ${prefix} before any command:` + "\n" +
                  "\nserver = Displays information about this server.\n" +
                  "\navatar <@Username> = Show a user's avatar. If no arguments, show your own avatar.\n" +
                  "\nflip = Flip a coin!\n" +
                  "\ninsult <@Username> = Insult someone! But beware, this power is a double edged sword.\n" +
                  "\nclap sincere OR insincere = Let someone know you appreciate them, or tell them they are full of themselves.\n" +
                  "\nadvice = Conjure sage wisdom from the internet.";

const help = (message) => {
    if (message.content === (`${prefix}help`)) {
        let embed = new Discord.MessageEmbed()
                    .setAuthor('List of Commands:')
                    .setDescription(description);

        Promise.resolve(message.channel.send(embed));
    }
}

export default help;