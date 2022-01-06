import { prefix } from '../config.json';
import Discord from 'discord.js';

let description = `Enter ${prefix} before any command:` + "\n" +
                  "\nserver = Displays information about this server.\n" +
                  "\navatar <@Username> = Show a user's avatar. If no arguments, show your own avatar.\n" +
                  "\nflip = Flip a coin!\n" +
                  "\ncat = See cute pictures of cats.\n" +
                  "\ndog = See cute pictures of dogs.\n" +
                  "\nferret = See cute pictures of ferrets.\n" +
                  "\nchinchilla = See cute pictures of chinchillas.\n" +
                  "\ninsult <@Username> = Insult someone! But beware, this power is a double edged sword.\n" +
                  "\ncompliment <@Username> = Compliment someone! Much better than an insult, don't you agree?\n" +
                  "\nclap sincere OR insincere = Let someone know you appreciate them, or tell them they are full of themselves.\n" +
                  "\nawful = Be shown an awful image.\n" +
                  "\ndndmeme = Be shown a dnd themed meme.\n" +
                  "\nadvice = Conjure sage wisdom from the internet.\n" +
                  "\ndefine = Look up a word!\n" +
                  "\naww = See cute animals!\n" +
                  "\nfunny or meme = I will show you a funny picture\n";

const help = (message) => {
    if (message.content === (`${prefix}help`)) {
        let embed = new Discord.MessageEmbed()
                    .setAuthor('List of Commands:')
                    .setDescription(description);

        Promise.resolve(message.channel.send(embed));
    }
}

export default help;
