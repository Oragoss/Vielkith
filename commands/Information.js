import {prefix} from '../config';
import CapitalizeFirstLetter from '../helpers/CapitalizeFirstLetter';
import fetch from 'node-fetch';
import Discord from 'discord.js';
import RandomColor from '../helpers/RandomColor';
import GetAuthorDisplayName from '../helpers/GetAuthorDisplayName';

export default class Information {
    constructor(message) {
        this.message = message; 
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence

        this.capitalizeFirstLetter = new CapitalizeFirstLetter();
        this.getAuthorDisplayName = new GetAuthorDisplayName();
        this.randomColor = new RandomColor();

        this.help();
        this.serverInfo();
        this.dictionary();
    }

    help() {
        let description = `Enter ${prefix} before any command:` + "\n" +
                        "\nserver = Displays information about this server.\n" +
                        "\navatar <@Username> = Show a user's avatar. If no arguments, show your own avatar.\n" +
                        "\nflip = Flip a coin!\n" +
                        "\ncat = See cute pictures of cats. 🐈‍⬛\n" +
                        "\ndog = See cute pictures of dogs. 🐕\n" +
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

        if (this.command === "help") {
            let embed = new Discord.MessageEmbed()
                        .setAuthor('List of Commands:')
                        .setDescription(description);

            Promise.resolve(this.message.channel.send(embed));
        }
    }

    serverInfo() {
         if (this.command === 'server') {
            if (!this.args.length) {
                return this.message.reply(`You didn't provide any arguments!\n\n Arguments for ${prefix}server:\n --info`);
            }
            if(this.args[0] === 'info'){
                return this.message.channel.send(`Server name: ${this.message.guild.name}\nTotal members: ${this.message.guild.memberCount}`);
            }
            if(this.args[0] === 'help'){
                return this.message.channel.send(`Type '$help' for help using this bot.`);
            }
            else {
               return this.message.reply(`Arguments for ${prefix}server:\n --info`);
            }
        }
    }

    dictionary() {    
        if (this.command === "def" || this.command === "definition" || this.command === "dictionary" || this.command === "define") {
            if(!this.args[0]) return this.message.channel.send("You must specify which word you would like defined.");
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.args[0]}`, {credentials:"include"})
            .then(response => response.json())
            .then((result) => {
                if(result.title === "No Definitions Found"){
                    this.message.reply(`Sorry, but I am unable to look up that word. Perhaps check your spelling?`);
                } else {                
                    let definitions = [];
                    for(let i = 0; i < result[0].meanings.length; i++) {
                        for (let x = 0; x < result[0].meanings[i].definitions.length; x++) {
                            definitions.push(
                                {name:"Definition", value: this.capitalizeFirstLetter.capitalizeFirstLetter(result[0].meanings[i].definitions[x].definition)},
                                {name:"Synonyms", value: JSON.stringify(result[0].meanings[i].definitions[x].synonyms)}
                            )
                        }
                    }
                    let embed = new Discord.MessageEmbed()
                    .setColor(this.randomColor.randomColor())
                    .setTitle(this.capitalizeFirstLetter.capitalizeFirstLetter(this.args[0]))
                    .setURL(`https://www.dictionary.com/browse/${this.args[0]}`)
                    .setDescription(JSON.stringify(result[0].origin) || "")
                    .addFields(
                        definitions
                    )
                    .setTimestamp()
                    .setFooter(`Asked by ${this.getAuthorDisplayName.getAuthorDisplayName(this.message)}`, this.message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))   
                    this.message.reply(embed)
                }
            });
        }
    }
}