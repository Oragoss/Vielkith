import fetch from 'node-fetch';

export default class SplitUrlTitlesAndPhotos {
    splitUrlTitlesAndPhotos(url, message) {
        fetch(url, {credentials:"include"})
        .then(response => response.json())
        .then((result) => {
            let pics = [];
    
            for (let i = 0; i < result.data.children.length; i++) {
                let data = result.data.children[i].data;                
                if((data.url.split('.').pop() === 'jpg') || (data.url.split('.').pop() === 'png')) {
                    pics.push({title: data.title, url: data.url, isGif: false});
                } else if (data.url.split('.').pop() === 'gif') {
                    pics.push({title: data.title, url: data.url, isGif: true});
                }
            }
    
            if(pics.length <= 0) {
                return message.channel.send("Couldn't find any images.");
            }
    
            let rnd = Math.floor(Math.random()*pics.length)
            if(pics[rnd].isGif)
                Promise.resolve(message.channel.send(`${pics[rnd].title} \n ${pics[rnd].url}`));
            else
                Promise.resolve(message.channel.send(`${pics[rnd].title}`, {
                    files : [pics[rnd].url]
                }));
        });
    }
}