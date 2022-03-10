import {prefix} from '../config';
import CapitalizeFirstLetter from '../helpers/CapitalizeFirstLetter';
import GetAuthorDisplayName from '../helpers/GetAuthorDisplayName';
import Discord from 'discord.js';
import RandomColor from '../helpers/RandomColor';

export default class Poll {
    constructor() {
        this.randomColor = new RandomColor();
        this.capitalizeFirstLetter = new CapitalizeFirstLetter();
        this.getAuthorDisplayName = new GetAuthorDisplayName();
    }

    async startPoll(message) {
        const args = message.content.slice(prefix.length).split(/ +/);  //arguments that follow the command
        const command = args.shift().toLowerCase(); //The first word in the command sentence
        if(command === "poll" || command === "startpoll") {
            let pollChannel = message.mentions.channels.first();
            let pollDescription = args.slice(2).join(' ');

            let embedPoll = new Discord.MessageEmbed()
            .setTitle(this.capitalizeFirstLetter.capitalizeFirstLetter(args[1]) || 'Poll')
            .setDescription(this.capitalizeFirstLetter.capitalizeFirstLetter(pollDescription))
            .setColor(this.randomColor.randomColor())
            .setFooter(`Asked by ${this.getAuthorDisplayName.getAuthorDisplayName(message)}`, message.author.avatarURL());

            let messageEmbed = await pollChannel.send(embedPoll);
            await messageEmbed.react('👍');
            await messageEmbed.react('👎');

            message.delete();
        }
    }
}