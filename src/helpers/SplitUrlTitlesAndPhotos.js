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
        let pics = [];
    
        for (let i = 0; i < result.data.children.length; i++) {
            let data = result.data.children[i].data;                
            if((data.url.split('.').pop() === 'jpg') || (data.url.split('.').pop() === 'png')) {
                pics.push({title: data.title, url: data.url, isGif: false});
            } 
            //TODO: Enable gifs?
            // else if (data.url.split('.').pop() === 'gif') {
            //     pics.push({title: data.title, url: data.url, isGif: true});
            // }
        }

        if(pics.length <= 0) {
            console.error("Couldn't find any data from the url given.")
        }
        //TODO: Enable gifs?
        // if(pics[rnd].isGif)
        
        const rnd = Math.floor(Math.random()*pics.length)
        const urlAndTitleObject = {
            title: pics[rnd].title,
            url: pics[rnd].url
        }
        return urlAndTitleObject;
    }
}

module.exports = {
    SplitUrlTitlesAndPhotos
}