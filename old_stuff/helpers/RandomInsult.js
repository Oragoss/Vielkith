export default class RandomInsult {
    randomInsult() {
        let helper = Math.floor(Math.random() * 5) + 1
        let insult = "No insult processed.";
        switch(helper) {
            case 1:
                insult = "Your mother was a murloc!";
            break
            case 2:
                insult = "Your processing power is limited!";
            break
            case 3:
                insult = "It takes you more than 3000 miliseconds to solve a math problem."
            break
            case 4:
                insult = "You'd make an orc look pretty."
            break
            case 5:
                insult = "I'd slap you but I'm afraid I'd catch something."
            break
        }
    
        return insult;
    }
}