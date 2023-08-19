// const { fetch } = require('node-fetch');
// const { SplitUrlTitlesAndPhotos } = require('../../helpers/SplitUrlTitlesAndPhotos');
// import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


class SplitUrlTitlesAndPhotos {
    /**
     * 
     * @param {string} url | This takes a url string from reddit and parses out the title from the url so they can be posted.
     * @returns 
     */
    async splitUrlTitlesAndPhotos(url) {
        const response = await fetch(url, {credentials:"include"})
        const result = await response.json();
        // for(let i = 0; i< result.data.children.length; i++) {
        //     console.log(result.data.children[i]);
        // }

        const rnd = Math.floor(Math.random()*result.data.children.length)
        console.log( result.data.children[rnd].data.title)
        console.log( result.data.children[rnd].data.url)
        const urlAndTitleObject = {
            title: result.data.children[rnd].data.title,
            url: result.data.children[rnd].data.url
        }
        return urlAndTitleObject;

        // .then(response => response.json())
        // .then((result) => {
        //     let pics = [];
    
        //     for (let i = 0; i < result.data.children.length; i++) {
        //         let data = result.data.children[i].data;                
        //         if((data.url.split('.').pop() === 'jpg') || (data.url.split('.').pop() === 'png')) {
        //             pics.push({title: data.title, url: data.url, isGif: false});
        //         } else if (data.url.split('.').pop() === 'gif') {
        //             pics.push({title: data.title, url: data.url, isGif: true});
        //         }
        //     }
        //     console.log(pics)
        //     console.log(`=========`)
        //     let rnd = Math.floor(Math.random()*pics.length)
        //     Promise.resolve(pics[rnd].url);
    
        //     // if(pics.length <= 0) {
        //     //     return message.channel.send("Couldn't find any images.");
        //     // }
    
        //     // if(pics[rnd].isGif)
        //     //     Promise.resolve(message.channel.send(`${pics[rnd].title} \n ${pics[rnd].url}`));
        //     // else
        //     //     Promise.resolve(message.channel.send(`${pics[rnd].title}`, {
        //     //         files : [pics[rnd].url]
        //     //     }));
        // });
    }
}

module.exports = {
    SplitUrlTitlesAndPhotos
}