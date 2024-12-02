// list of emojis
// NEW https://emojipedia.org/
// OLD http://unicode.org/emoji/charts/full-emoji-list.html
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

    randomBirthdayEmoji() {
        const choice = ['🥮', '🎂', '🍰', '🧁', '🎈', '🎉', '🎊', '✨', '🎇', '🎆'];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
    }

    randomChorusEmoji() {
        const choice = ['😲', '😯', '😮', '🙁', '😟', '🤓', '🧐', '🤠', '😎', '🥸', '😦', '😧', '🥳', '🤯', '😏', '😶‍🌫️', '😂', '😆', '🤣', '😶', '😁', '😄', '🙃', '😜', '😝', '😌', '🥰', '😍', '🤩', '😇', '🤗', '😊', '🤭', '😀', '😃', '😅', '😉', '🤑', '🤔'];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
    }
}