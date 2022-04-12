import {prefix, newsApiKey} from '../config';
import Discord from 'discord.js';
import RandomColor from '../helpers/RandomColor';
import fetch from 'node-fetch';

export default class News {
    constructor() {
        this.randomColor = new RandomColor();
    }

    getNews(message) {
        const args = message.content.slice(prefix.length).split(/ +/);  //arguments that follow the command
        const command = args.shift().toLowerCase(); //The first word in the command sentence
        if (command === "news") {
            fetch(`https://newsapi.org/v2/everything?q=${args[0]}&apiKey=${newsApiKey}`, {credentials:"include"})
            .then(response => response.json())
            .then((result) => {

                const rnd = Math.floor(Math.random()*result.articles.length);
                const article = result.articles[rnd];

                //TODO: Abstract this
                let embed = new Discord.MessageEmbed()
                .setColor(this.randomColor.randomColor())
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
                message.channel.send(embed)
            });
        } 
    };
}

//TODO: Abstract this
const removeTags = (str) => {
    if ((str===null) || (str===''))
    return null;
    else
    str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
}