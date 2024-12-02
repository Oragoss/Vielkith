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

        const children = result.data.children.filter((child) => {
            const dotIndex = child?.data?.url?.lastIndexOf('.');
            const stringExtension = child?.data?.url?.substring(dotIndex); //looking for everything that comes after . like .jpeg

            if((stringExtension === '.jpeg' || stringExtension === '.jpg' || stringExtension === '.png')) {
                const title = child.data.title;
                const url = child.data.url;
                return {title, url, isGif: false};
            }
        })
    
        if(children.length <= 0) {
            console.error("Couldn't find any data from the url given.")
            return
        }
        //TODO: Enable gifs?
        // if(pics[rnd].isGif)        
        
        const rnd = Math.floor(Math.random()*children.length)

        const urlAndTitleObject = {
            title: children[rnd].data.title,
            url: children[rnd].data.url
        }
        return urlAndTitleObject;
    }
}

module.exports = {
    SplitUrlTitlesAndPhotos
}
