import { prefix, rolePlayingDataPath, rolePlayingChannels } from '../../config';
const fs = require('fs');
import Discord from 'discord.js';
import RandomColor from '../../helpers/RandomColor';

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
                
                // const itemSelection = fs.readFileSync(itemDropsPath, 'utf8', function(err, itemData) {
                //     return JSON.parse(itemData);
                // });
                // console.log("item data:")
                // console.log(itemSelection)
                
                //TODO: Make this testable??
                const activeScenario = rolePlayData.scenarios.filter(x => x.active === true);
                const randomAmount = Math.floor(Math.random() * activeScenario[0].amountMax);
                const randomRewardInt = Math.floor(Math.random() * activeScenario[0].reward.length);
    
                const embed = new Discord.MessageEmbed()
                .setColor(new RandomColor().randomColor())
                .setTitle(`Accepted`)
                .addFields(
                    {name: `You receive ${randomAmount}:`, value: `${activeScenario[0].reward[randomRewardInt]}`}
                );
    
                for(let i = 0; i < rolePlayingChannels.length; i++) {
                    Promise.resolve(message.channel.send(embed))
                    .then(message => {
                        message.react('👍')
                    });
                }
    
                for(let i = 0; i < rolePlayData.scenarios.length; i++) {
                    rolePlayData.scenarios[i].active = false;
                }

                //TODO: Abstract the update functionality into it's own file.
                let json = JSON.stringify(rolePlayData);
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
                
                // const itemSelection = fs.readFileSync(itemDropsPath, 'utf8', function(err, itemData) {
                //     return JSON.parse(itemData);
                // });
                // console.log("item data:")
                // console.log(itemSelection)
                
                //TODO: Make this testable??
                const activeScenario = rolePlayData.scenarios.filter(x => x.active === true);
                const randomAmount = Math.floor(Math.random() * activeScenario[0].amountMax);
                const randomRewardInt = Math.floor(Math.random() * activeScenario[0].reward.length);
    
                const embed = new Discord.MessageEmbed()
                .setColor(new RandomColor().randomColor())
                .setTitle(`Rejected`)
                .setDescription(`You must move on...`);
    
                for(let i = 0; i < rolePlayingChannels.length; i++) {
                    Promise.resolve(message.channel.send(embed))
                    .then(message => {
                        message.react('👎')
                    });
                }
    
                for(let i = 0; i < rolePlayData.scenarios.length; i++) {
                    rolePlayData.scenarios[i].active = false;
                }

                //TODO: Abstract the update functionality into it's own file.
                let json = JSON.stringify(rolePlayData);
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
