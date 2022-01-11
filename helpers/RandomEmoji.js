// list of emojis
// http://unicode.org/emoji/charts/full-emoji-list.html
export default class RandomEmoji {    
    constructor() {}

    randomFunnyEmoji() {
        const choice = ['😂', '😆', '🤣', '😁', '😄', '🙃', '😜', '😝', '😅'];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
    }

    randomAwwEmoji() {
        const choice = ['😌', '🥰', '🤣', '😍', '🤩', '😇', '🤗', '😊', '🤭', '😃', '🙂', '😳'];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
    }

    randomAwfulEmoji() {
        const choice = ['😯', '😮', '🤐', '🤨', '😐', '😑', '😶', '😒', '😏', '🙄', '😲', '😬', '🤮', '🤢', '😵', '😵‍💫', '😦', '😧', '😨', '😰', '😱', '😖'];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
    }

    randomChorusEmoji() {
        const choice = ['😲', '😯', '😮', '🙁', '😟', '🤓', '🧐', '🤠', '😎', '🥸', '😦', '😧', '🥳', '🤯', '😏', '😶‍🌫️', '😂', '😆', '🤣', '😶', '😁', '😄', '🙃', '😜', '😝', '😌', '🥰', '😍', '🤩', '😇', '🤗', '😊', '🤭', '😀', '😃', '😅', '😉', '🤑', '🤔'];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
    }
}