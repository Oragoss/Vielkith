export default class RandomColor {
    randomColor() {
        //Set's a random hex number
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return `#${randomColor}`;
    }
}