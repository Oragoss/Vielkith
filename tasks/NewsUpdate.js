import { newsDataPath, adviceChannels, newsApiKey } from '../config';
import fetch from 'node-fetch';
const fs = require('fs');
import Discord from 'discord.js';
import RandomColor from '../helpers/RandomColor';

export default class NewsUpdate {
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
                
                fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`, {credentials:"include"})
                .then(response => response.json())
                .then((result) => {
                    const newDate = new Date(Date.now()).toDateString();
                    console.log(`Sending a news article because it's been ${daysBetween(newsConfigData.lastUpdatedDate, new Date(Date.now()).toLocaleString())} day(s) since the last one has been sent.`);
                    newsConfigData.lastUpdatedDate = newDate;

                    const rnd = Math.floor(Math.random()*result.articles.length);
                    const article = result.articles[rnd];
    
                    const embed = new Discord.MessageEmbed()
                    .setColor(new RandomColor().randomColor())
                    .setURL(removeTags(article.url) || "No url available, sorry.")
                    .setTitle(removeTags(article.title) || "This article doesn't have a title, sorry.")
                    .setThumbnail(removeTags(article.urlToImage))
                    .setDescription(removeTags(article.description) || "This article doesn't have a description, sorry.")
                    .addFields(
                        {name: "Published at", value: `${new Date(removeTags(article.publishedAt)).toLocaleString()}`},
                        {name: "Source", value: `${removeTags(article.source.name)}`},
                        {name: "Author", value: `${removeTags(article.author) === null ? 'Unkown': removeTags(article.author)}`}
                    )
                    .setTimestamp()
                    .setFooter(`If you want more news, you can type !news. If you want more news about a specific topic you can type !news <topic>. Right now I can only handle one word topics.`)
                    for(let i = 0; i < adviceChannels.length; i++) {
                        client.channels.cache.get(adviceChannels[i]).send(embed);
                    }

                    let json = JSON.stringify(newsConfigData);
                    fs.writeFile(file, json, 'utf8', function(err) {
                        if(err) {
                            return console.log(err);
                        }
                    });
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

//TODO: Abstract this
const removeTags = (str) => {
    if ((str===null) || (str===''))
    return null;
    else
    str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
}