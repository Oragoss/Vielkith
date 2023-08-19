class RandomLink {    
    constructor() {}

    randomAwesomeLink() {
        const natureisfuckinglit = "https://www.reddit.com/r/natureisfuckinglit.json";
        const earthPorn = "https://www.reddit.com/r/earthporn.json";
        const spacePorn = "https://www.reddit.com/r/spaceporn.json";
        const solarPunkPorn = "https://www.reddit.com/r/solarpunkporn.json";
        const natureIsMetal = "https://www.reddit.com/r/natureismetal.json";
        const choice = [natureisfuckinglit, natureIsMetal, earthPorn, spacePorn, solarPunkPorn];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
    }
    
    randomAwfulLink() {    
        const thanksIHateIt = "https://www.reddit.com/r/TIHI.json";
        const wtf = "https://www.reddit.com/r/wtf.json";
        const trashy = "https://www.reddit.com/r/trashy.json";
        const awfulEverything = "https://www.reddit.com/r/awfuleverything.json";    
        const cringetopia = "https://www.reddit.com/r/Cringetopia.json";
        const justNeckBeardThings = "https://www.reddit.com/r/justneckbeardthings.json";
        const atbe = "https://www.reddit.com/r/ATBGE.json";
        const wellThatSucks = "https://www.reddit.com/r/WellThatSucks.json";
        const popping = "https://www.reddit.com/r/popping.json";
        const choice = [popping, wellThatSucks, atbe, justNeckBeardThings, cringetopia, thanksIHateIt, wtf, trashy, awfulEverything];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
    }
    
    randomAwwLink() {    
        const aww = "https://www.reddit.com/r/aww.json";
        const wholesomeMemes = "https://www.reddit.com/r/wholesomeMemes.json";
        const eyebleach = "https://www.reddit.com/r/eyebleach.json";
        const hardcoreaww = "https://www.reddit.com/r/hardcoreaww.json";
        const choice = [aww, wholesomeMemes, eyebleach, hardcoreaww];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
    }
    
    randomFunnyLink() {
        const funny = "https://www.reddit.com/r/funny.json";
        const memes = "https://www.reddit.com/r/memes.json";
        const dankmemes = "https://www.reddit.com/r/dankmemes.json";
        const lotrmemes = "https://www.reddit.com/r/lotrmemes.json";
        const prequelMemes = "https://www.reddit.com/r/PrequelMemes.json";
        const politicalhumor = "https://www.reddit.com/r/PoliticalHumor.json";
        const memeEconomy = "https://www.reddit.com/r/MemeEconomy.json";
        const adviceAnimals = "https://www.reddit.com/r/AdviceAnimals.json";
        const meIrlgbt = "https://www.reddit.com/r/me_irlgbt.json";
        const merIrl = "https://www.reddit.com/r/me_irl.json";
        const choice = [merIrl, meIrlgbt, adviceAnimals, funny, memes, dankmemes, lotrmemes, prequelMemes, politicalhumor, memeEconomy];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
    }
}

module.exports = {
    RandomLink
}