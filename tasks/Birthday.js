import { birthdayDataPath, birthdayChannels } from '../config';
import RandomEmoji from '../helpers/RandomEmoji';
import RandomColor from '../helpers/RandomColor';
import Discord from 'discord.js';
import Util from '../helpers/Util';
const fs = require('fs');

export default class Reddit {    
    constructor() {
    }

    update(client) {
        try {
            const file = birthdayDataPath;
            fs.readFile(file, 'utf8', function readFileCallback(err, data) {
                if (err){
                    console.log(err);
                } else {
                    // ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                    const configData = JSON.parse(data);
                    const util = new Util();
                    if(util.daysBetween(configData.lastUpdatedDate, Date.now()) < 1) return;
    
                    const emoji = new RandomEmoji();
                    const color = new RandomColor();
                    let shouldPostBirthdayMessage = false;
    
                    for(let i = 0; i < configData.birthdays.length; i++) {
                        const d1 = new Date(Date.now()).toDateString();
                        const d2 = configData.birthdays[i].date;
                        shouldPostBirthdayMessage = d1 === d2;

                        if(shouldPostBirthdayMessage) {
                            let embed = new Discord.MessageEmbed()
                            .setColor(color.randomColor())
                            .setTitle(`HAPPY BIRTHDAY ${configData.birthdays[i].name}!`)
                            .setDescription(`❗❗${emoji.randomBirthdayEmoji()} ${emoji.randomBirthdayEmoji()} ${emoji.randomBirthdayEmoji()}❗❗`)
                            .setTimestamp();
                        
                            for(let i = 0; i < birthdayChannels.length; i++) {
                                client.channels.cache.get(birthdayChannels[i]).send(embed);
                            }
                            configData.birthdays[i].date = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toDateString();
                        }
                    }
                    const newDate = new Date(Date.now()).toDateString();
                    configData.lastUpdatedDate = newDate;

                    let json = JSON.stringify(configData, null, 2);
                    fs.writeFile(file, json, 'utf8', function(err) {
                        if(err) {
                            return console.log(err);
                        }
                    });
                }
            });
        } catch (err) {
            console.log(`Birthday Update: ${err}`);
        }
    };
}