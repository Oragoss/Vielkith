import { rolePlayingDataPath, rolePlayingChannels } from '../../config';
const fs = require('fs');
import Discord from 'discord.js';
import RandomColor from '../../helpers/RandomColor';

const generateRolePlayPrompt = (client) => {
    const file = rolePlayingDataPath;
    fs.readFile(file, 'utf8', function readFileCallback(err, data) {
        if (err){
            console.log(err);
        } else {
            const rolePlayData = JSON.parse(data);
            if(daysBetween(rolePlayData.lastUpdatedDate, Date.now()) < 1) return;

            const newDate = new Date(Date.now()).toDateString();
            console.log(`Generating a role play prompt!`);
            rolePlayData.lastUpdatedDate = newDate;

            //Failsafe to prevent more than one scenario from being active at once.
            for(let i = 0; i < rolePlayData.scenarios.length; i++) {
                rolePlayData.scenarios[i].active = false;
            }
            
            //TODO: Make this testable??
            const randomInt = Math.floor(Math.random() * rolePlayData.scenarios.length);
            const randomScenario = rolePlayData.scenarios[randomInt];

            const embed = new Discord.MessageEmbed()
            .setColor(new RandomColor().randomColor())
            .setTitle(`‼ ${randomScenario.title} ‼`)
            .setDescription(`${randomScenario.description}\n`)
            .addFields(
                {name: "To accept type:", value: `!accept`},
                {name: "To reject type:", value: `!reject`},
            )
            .setTimestamp()
            .setFooter(`The first person to respond will determine what happens in the scenario.`)

            for(let i = 0; i < rolePlayingChannels.length; i++) {
                client.channels.cache.get(rolePlayingChannels[i]).send(embed)
                .then(message => {
                    // message.react('👍')
                    // message.react('👎')
                });
            }

            //TODO: Abstract the update functionality into it's own file.
            rolePlayData.scenarios[randomInt].active = true;
            let json = JSON.stringify(rolePlayData);
            fs.writeFile(file, json, 'utf8', function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        }
    });
}

function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

export default generateRolePlayPrompt;