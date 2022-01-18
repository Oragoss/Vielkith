import { newsDataPath, newsApiChannel, newsApiKey } from '../config';
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
                    .setURL(article.url || "No url available, sorry.")
                    .setTitle(article.title || "This article doesn't have a title, sorry.")
                    .setThumbnail(article.urlToImage)
                    .setDescription(article.description || "This article doesn't have a description, sorry.")
                    .addFields(
                        {name: "Published at", value: `${new Date(article.publishedAt).toLocaleString()}`},
                        {name: "Source", value: `${article.source.name}`},
                        {name: "Author", value: `${article.author}`}
                    )
                    .setTimestamp()
                    .setFooter(`If you want more news, you can type !news. If you want more news about a specific topic you can type !news topic. Right now it can only handle one word topics.`)
                    client.channels.cache.get(newsApiChannel).send(embed);

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