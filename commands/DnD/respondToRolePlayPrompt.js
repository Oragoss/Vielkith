import { prefix, rolePlayingDataPath, rolePlayingChannels } from '../../config';
const fs = require('fs');
import Discord from 'discord.js';
import GetAuthorDisplayName from '../../helpers/GetAuthorDisplayName';

const respondToRolePlayPrompt = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence
    if (command === "accept") {
        const file = rolePlayingDataPath;
        fs.readFile(file, 'utf8', function readFileCallback(err, data) {
            if (err){
                console.log(err);
            } else {
                const rolePlayData = JSON.parse(data);
                
                //TODO: Make this testable??
                const activeScenario = rolePlayData.scenarios.filter(x => x.active === true);
                if(activeScenario.length <= 0)
                    return;

                let randomAmount = (Math.floor(Math.random() * activeScenario[0].amountMax));
                if(randomAmount === 0)
                    randomAmount = 1;

                const randomRewardInt = Math.floor(Math.random() * activeScenario[0].reward.length);
                const getAuthorDisplayName = new GetAuthorDisplayName();
    
                //TODO: Get the message to send author name
                //<@${message.author.id}>
                const embed = new Discord.MessageEmbed()
                .setColor("#28A745")
                .setTitle(`Accepted`)
                .addFields(
                    {name: `${activeScenario[0].acceptMessage}`, value: `You receive ${randomAmount} ${activeScenario[0].reward[randomRewardInt]}`}
                )
                .setFooter(`Accepted by ${getAuthorDisplayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }));
    
                for(let i = 0; i < rolePlayingChannels.length; i++) {
                    Promise.resolve(message.channel.send(embed))
                    .then(botMessage => {
                        botMessage.react('👍')
                    });
                }
                message.delete();
    
                // for(let i = 0; i < rolePlayData.scenarios.length; i++) {
                //     rolePlayData.scenarios[i].active = false;
                // }

                //TODO: Abstract the update functionality into it's own file.
                let json = JSON.stringify(rolePlayData, null, 2);
                fs.writeFile(file, json, 'utf8', function(err) {
                    if(err) {
                        return console.log(err);
                    }
                });
            }
        });
    } else if (command === "reject") {
        const file = rolePlayingDataPath;
        fs.readFile(file, 'utf8', function readFileCallback(err, data) {
            if (err){
                console.log(err);
            } else {
                const rolePlayData = JSON.parse(data);
    
                const getAuthorDisplayName = new GetAuthorDisplayName();

                //TODO: Make this testable??
                const activeScenario = rolePlayData.scenarios.filter(x => x.active === true);
                if(activeScenario.length <= 0)
                    return;
    
                //TODO: Get the message to send author name
                //<@${message.author.id}>
                const embed = new Discord.MessageEmbed()
                .setColor("#FF315A")
                .setTitle(`Rejected`)
                .setDescription(activeScenario[0].rejectMessage || `You move on...`)
                .setFooter(`Rejected by ${getAuthorDisplayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }));
    
                for(let i = 0; i < rolePlayingChannels.length; i++) {
                    Promise.resolve(message.channel.send(embed))
                    .then(botMessage => {
                        botMessage.react('👎')
                    });
                }
                message.delete();
    
                // for(let i = 0; i < rolePlayData.scenarios.length; i++) {
                //     rolePlayData.scenarios[i].active = false;
                // }

                //TODO: Abstract the update functionality into it's own file.
                let json = JSON.stringify(rolePlayData, null, 2);
                fs.writeFile(file, json, 'utf8', function(err) {
                    if(err) {
                        return console.log(err);
                    }
                });
            }
        });
    }
}

export default respondToRolePlayPrompt;
