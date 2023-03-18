import {prefix, playerStatsDataPath} from '../../config';
import GetAuthorDisplayName from '../../helpers/GetAuthorDisplayName';
import RandomColor from '../../helpers/RandomColor';
import Discord from 'discord.js';

const roll = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence
    if (command === "rollstats") {
        let numberOfDie = (args[0] === "variant" || args[0] === "2d6") ? 2 : 4;
        const rollArray = [];
        const numberOfStatRolls = 6;
        const color = new RandomColor();
        const displayName = new GetAuthorDisplayName();

        for(let i = 0; i < numberOfStatRolls; i++) {
            let score = [];
            for(let x =0; x < numberOfDie; x++) {
                let d6 = Math.floor((Math.random() * 6)+1);
                score.push(d6);
            }

            if(args[0] === "variant" || args[0] === "2d6") {
                rollArray.push(score[0] + score[1] + 6)
                console.log(score)
            } else {
                const sortScore = score.sort().filter((_,i) => i)   //This works by sorting and then creating a new array from the items where indeces are truthy(anything but 0)
                let newScore = sortScore[0] + sortScore[1] + sortScore[2];
                newScore < 8 ? rollArray.push(8):rollArray.push(newScore);
            }
        }

        let embed = new Discord.MessageEmbed()
            .setColor(color.randomColor())
            .setDescription(`<@${message.author.id}>, Your skill array is:`)
            .addFields(
                {name:"1st roll:", value: rollArray[0]},
                {name:"2nd roll:", value: rollArray[1]},
                {name:"3rd roll:", value: rollArray[2]},
                {name:"4th roll:", value: rollArray[3]},
                {name:"5th roll:", value: rollArray[4]},
                {name:"6th roll:", value: rollArray[5]}
            )
            .setTimestamp()
            .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
        Promise.resolve(message.channel.send(embed));
    }
    if(command === "roll") {
        Promise.resolve(message.channel.send("Sorry, I need to work on this command. I promise it's coming soon!"));
    }
}

export default roll;