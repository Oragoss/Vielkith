import { newsDataPath, adviceChannels } from '../config';
import fetch from 'node-fetch';
const fs = require('fs');
import Discord from 'discord.js';
import RandomColor from '../helpers/RandomColor';

export default class AdviceUpdate {
    constructor() {
    }

    update(client) {
        const file = newsDataPath;
        fs.readFile(file, 'utf8', function readFileCallback(err, data) {
            if (err){
                console.log(err);
            } else {
                const newsConfigData = JSON.parse(data);
                if(daysBetween(newsConfigData.lastUpdatedDate, Date.now()) < 1) return;
                
                const rnd = Math.floor(Math.random()*2);
                console.log(`The random number was ${rnd}`);
                if(rnd !== 0) {
                    goodAdvice(client);
                    return;
                } else {
                  badAdvice(client);
                  return;
                }
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

function badAdvice (client) {
    fetch("https://www.reddit.com/r/ShittyLifeProTips.json", {credentials:"include"})
    .then(response => response.json())
    .then((result) => {
        const data = result.data.children;
        const filteredData = data.filter(datum => datum.data.thumbnail === "self" && datum.data.title.length <= 256);

        const rnd = Math.floor(Math.random()*filteredData.length)
        const choice = {title: filteredData[rnd].data.title, description: filteredData[rnd].data.selfText};

        const color = new RandomColor();

        let embed = new Discord.MessageEmbed()
            .setColor(color.randomColor())
            .setTitle(choice.title || "Couldn't find any titles, sorry.")
            .setDescription(choice.description || "")
            .setTimestamp();
        
        console.log("Sending Bad Advice!");
        for(let i = 0; i < adviceChannels.length; i++) {
            client.channels.cache.get(adviceChannels[i]).send(embed);
        }
    });
}

function goodAdvice(client) {
    fetch("http://api.adviceslip.com/advice", {credentials:"include"})
    .then(response => response.json())
    .then((result) => {
        const embed = new Discord.MessageEmbed()
        .setColor(new RandomColor().randomColor())
        .setTitle("Advice of the day.")
        .setDescription(`${result.slip.advice}`);
        
        console.log("Sending Good Advice!");
        for(let i = 0; i < adviceChannels.length; i++) {
            client.channels.cache.get(adviceChannels[i]).send(embed);
        }
    });
}