import {prefix} from '../config';
import Discord from 'discord.js';

export default class Game {
    constructor(message) {
        this.message = message;
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence
        
        this.rockPaperScissors();
    }

    async rockPaperScissors(message) {
        if(this.command === "rps" || this.command === "rockpaperscissors" || this.command === "rock-paper-scissors") {
            //Play around with this https://stackoverflow.com/questions/60790008/discord-js-awaitmessages
            const id = message.member.id;
            const msg = await message.channel.send(scheduler1);
            await msg.react('1️⃣');
            await msg.react('2️⃣');
            await msg.react('3️⃣');
            await msg.react('3️⃣');
            const filter = (reaction, user) => (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '3️⃣' || reaction.emoji.name == '4️⃣');
            const collected = await msg.awaitReactions(filter, { max: 1, time: 30000 })
                .catch(() => {
                    msg.edit('No answer after 30 seconds, operation canceled.');
                    return;
                });
            if(!collected) return;
            if (collected.first().emoji.name == '1️⃣') {
                msg.edit(scheduler2);
                msg.clearReactions();
                console.log('try');
                const filter2 = m => Number(m.content) >= 1 && Number(m.content) <= 23;
                const collected2 = await msg.channel.awaitMessages(filter2, { max: 1, time: 6000, errors: ['time'] });
                msg.channel.send(collected2.first().content)
                    .catch(collectedx => console.log(`After a minute, only ${collectedx.size} out of 4 voted.`));
            }
            if (collected.first().emoji.name == '2️⃣') {
                msg.edit(scheduler3);
                msg.clearReactions();
            }
            if (collected.first().emoji.name == '3️⃣') {
                msg.edit(scheduler4);
                msg.clearReactions();
            }
        }
    }
}