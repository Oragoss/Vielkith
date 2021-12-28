import {prefix} from '../config';

const rank = (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence

    if(command === "rank") {
        //https://cdn.discordapp.com/attachments/218439898699399168/466616754521505794/card.png
        //TODO: Go get the actual rank
        //TODO: Generate picture? make this look cooler
        let rank = 0;
        let level = 1;
        let guildMember = `${message.author.tag}`;
        let exp = `11/30`;

        return message.channel.send(
            guildMember +
            `\nYou are rank #${rank} level: ${level} \n${exp}exp to the next level!
            `
        );
    }
}
export default rank;