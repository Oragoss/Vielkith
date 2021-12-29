import fetch from 'node-fetch';

const splitUrlTitlesAndPhotos = (url, message) => {
    fetch(url, {credentials:"include"})
    .then(response => response.json())
    .then((result) => {
        let pics = [{
            title: "",
            url: ""
        }];

        for (let i = 0; i < result.data.children.length; i++) {
            let data = result.data.children[i].data;                
            if((data.url.split('.').pop() === 'jpg') || (data.url.split('.').pop() === 'png') || (data.url.split('.').pop() === 'gif')) {
                pics.push({title: data.title, url: data.url});
            }
        }

        if(pics.length <= 0) {
            return message.channel.send("Couldn't find any images.");
        }

        let rnd = Math.floor(Math.random()*pics.length)
        Promise.resolve(message.channel.send(`${pics[rnd].title}`, {
            files : [pics[rnd].url]
        }));
    });
}

export default splitUrlTitlesAndPhotos;