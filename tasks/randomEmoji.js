// list of emojis
// http://unicode.org/emoji/charts/full-emoji-list.html

const randomFunnyEmoji = () => {
    const choice = ['😂', '😆', '🤣', '😁', '😄', '🙃', '😜', '😝'];
    let randomInt = Math.floor(Math.random() * choice.length);
    return choice[randomInt];
}

const randomAwwEmoji = () => {
    const choice = ['😌', '🥰', '🤣', '😍', '🤩', '😇', '🤗', '😊', '🤭'];
    let randomInt = Math.floor(Math.random() * choice.length);
    return choice[randomInt];
}

const randomAwfulEmoji = () => {
    const choice = ['🤐', '🤨', '😐', '😑', '😶', '😒', '😏', '🙄', '😬', '🤮', '🤢', '😵', '😵‍💫'];
    let randomInt = Math.floor(Math.random() * choice.length);
    return choice[randomInt];
}

module.exports = {
    randomFunnyEmoji,
    randomAwwEmoji,
    randomAwfulEmoji
}