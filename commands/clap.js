import {prefix} from '../config';

const clap = (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if (command === "clap")  {
        if(!args[0]) {
            return message.reply("Sincerely or insincerely? I am far too busy to read your mind.\n If you want me to direct the clap at someone mention them with an @.");
        }
        if(!args[1]) {
            if(args[0] === "sincere" || "sincerely") {
                Promise.resolve(message.channel.send("Cheers!", {
                    files : [clapImages.sincere[randomImageSincere()]]
                }));
            }
            else if(args[0] === "insincere" || "insincerely") {
                Promise.resolve(message.channel.send("Wow...", {
                    files : [clapImages.insincere[randomImageInsincere()]]
                }));
            }
        }
        if(args[1]) {
            if(args[0] === "sincere" || "sincerely") {
                const userList = message.mentions.users.map(user => {
                    return `${user.username} `;
                });
                Promise.resolve(message.channel.send(`Cheers, ${userList}!`, {
                    files : [clapImages.sincere[randomImageSincere()]]
                }));
            }
            else if(args[0] === "insincere" || "insincerely") {
                const userList = message.mentions.users.map(user => {
                    return `${user.username} `;
                });
                Promise.resolve(message.channel.send(`${userList}, just... wow.`, {
                    files : [clapImages.insincere[randomImageInsincere()]]
                }));
            }
        }
    }
}

const randomImageSincere = () => {
    let randInt = Math.floor(Math.random() * clapImages.sincere.length);  //Return a number between 1 and 3
    return randInt;
}

const randomImageInsincere = () => {
    let randInt = Math.floor(Math.random() *  clapImages.insincere.length)  //Return a number between 1 and 3
    return randInt;
}

const clapImages = {
  sincere: [
    "http://i.imgur.com/pfrtv6H.gif",
    "http://i.imgur.com/Bp4P8l3.gif",
    "http://i.imgur.com/v7mZ22P.gif",
    "http://i.imgur.com/S1v4KuY.gif",
    "http://i.imgur.com/YTaSAkq.gif",
    "http://i.imgur.com/JO6Wz3r.gif",
    "http://i.imgur.com/pWEd6cF.gif",
    "http://i.imgur.com/zumSlIA.gif",
    "http://i.imgur.com/RGczKmV.gif",
    "http://i.imgur.com/KAQhoCm.gif",
    "http://i.imgur.com/PASRKXo.gif",
    "http://i.imgur.com/ZOWQTO6.gif",
    "http://i.imgur.com/cY0eH5c.gif",
    "http://i.imgur.com/wf5qvOM.gif",
    "http://i.imgur.com/9Zv4V.gif",
    "http://i.imgur.com/t8zvc.gif",
    "http://cache.blippitt.com/wp-content/uploads/2012/06/Daily-Life-GIFs-06-The-Rock-Clapping.gif",
    "http://25.media.tumblr.com/tumblr_m00e9mCyWj1rqtbn0o1_500.gif",
    "http://assets0.ordienetworks.com/images/GifGuide/clapping/Kurtclapping.gif",
    "http://assets0.ordienetworks.com/images/GifGuide/clapping/riker.gif",
    "http://assets0.ordienetworks.com/images/GifGuide/clapping/hp3.gif",
    "http://assets0.ordienetworks.com/images/GifGuide/clapping/1292223254212-dumpfm-mario-Obamaclap.gif",
    "http://www.reactiongifs.com/wp-content/uploads/2013/01/applause.gif"
  ],
  insincere: [
    "http://i.imgur.com/2QXgcqP.gif",
    "http://i.imgur.com/Yih2Lcg.gif",
    "http://i.imgur.com/un3MuET.gif",
    "http://i.imgur.com/H2wPc1d.gif",
    "http://i.imgur.com/uOtALBE.gif",
    "http://i.imgur.com/nmqrdiF.gif",
    "http://i.imgur.com/GgxOUGt.gif",
    "http://i.imgur.com/wyTQMD6.gif",
    "http://i.imgur.com/GYRGOy6.gif",
    "http://i.imgur.com/ojIsLUA.gif",
    "http://i.imgur.com/bRetADl.gif",
    "http://i.imgur.com/814mkEC.gif",
    "http://i.imgur.com/uYryMyr.gif",
    "http://i.imgur.com/YfrikPR.gif",
    "http://i.imgur.com/sBEFqYR.gif",
    "http://i.imgur.com/Sx8iAS8.gif",
    "http://i.imgur.com/5zKXz.gif"
  ]
};


export default clap;