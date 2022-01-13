import { newsDataPath, newsApiChannel } from '../config';
import fetch from 'node-fetch';
const fs = require('fs');

export default class NewsUpdate {
    constructor(client) {
    }

    update(client) {
        const file = newsDataPath;
        fs.readFile(file, 'utf8', function readFileCallback(err, data) {
            if (err){
                console.log(err);
            } else {
                let newsConfigData = JSON.parse(data);
                if(daysBetween(newsConfigData.lastUpdatedDate, Date.now()) < 1) return;
                
                fetch(`https://www.reddit.com/r/news.json`, {credentials:"include"})
                .then(response => response.json())
                .then((result) => {
                    const newDate = new Date(Date.now()).toLocaleString()
                    console.log(`Sending a news article because it's been ${daysBetween(newsConfigData.lastUpdatedDate, new Date(Date.now()).toLocaleString())} day(s) since the last one has been sent.`);
                    newsConfigData.lastUpdatedDate = newDate;

                    let news = [{
                        title: "",
                        url: ""
                    }];
                    
                    for (let i = 0; i < result.data.children.length; i++) {
                        let data = result.data.children[i].data;
                        news.push({title: data.title, url: data.url});
                    }
            
                    if(news.length <= 0) {
                        return this.message.channel.send("Couldn't find any posts.");
                    }

                    let rnd = Math.floor(Math.random()*news.length);
                    client.channels.cache.get(newsApiChannel).send(`${news[rnd].title} \n ${news[rnd].url}`);

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