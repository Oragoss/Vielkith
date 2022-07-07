import { newsDataPath, newsApiChannel, athelornChannel } from '../config';
import fetch from 'node-fetch';
const fs = require('fs');
import Discord from 'discord.js';
import RandomColor from '../helpers/RandomColor';

export default class AdviceUpdate {
    constructor() {
    }

    //TODO: Make the news path and api functionality more generic between this class and the NewsUpdate class
    update(client) {
        const file = newsDataPath;
        fs.readFile(file, 'utf8', function readFileCallback(err, data) {
            if (err){
                console.log(err);
            } else {
                const newsConfigData = JSON.parse(data);
                if(daysBetween(newsConfigData.lastUpdatedDate, Date.now()) < 1) return;
                
                fetch("http://api.adviceslip.com/advice", {credentials:"include"})
                .then(response => response.json())
                .then((result) => {
                    const embed = new Discord.MessageEmbed()
                    .setColor(new RandomColor().randomColor())
                    .setTitle("Advice of the day.")
                    .setDescription(result.slip.advice)
                    client.channels.cache.get(newsApiChannel).send(embed);
                    client.channels.cache.get(athelornChannel).send(embed);
                    console.log(athelornChannel)
                });
            }
        });
    };
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