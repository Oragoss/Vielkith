import {prefix, drake, triggerId} from '../config';
import RandomEmoji from '../helpers/RandomEmoji';
import Discord from 'discord.js';
import RandomColor from '../helpers/RandomColor';

export default class ComradeChorus {
    constructor(message) {
        this.message = message; 
        this.args = this.message.content.slice(prefix.length).split(/ +/);
        this.command = this.args.shift().toLowerCase(); //The first word in the command sentence

        this.randomEmoji = new RandomEmoji();
        this.randomColor = new RandomColor();

        this.chorus();
    }

    chorus() {
        if(this.message.author.username === triggerId) {
            if(Math.floor(Math.random() * 100) >= 2.5 ) return;
            const iterations = Math.floor(Math.random() * 4) + 1;
            console.log(`\nHow many chorus iterations Drake triggered: ${iterations}`)
            for(let i = 0; i < iterations; i++) {
                this.message.react(this.randomEmoji.randomChorusEmoji())
                let embed = new Discord.MessageEmbed()
                .setColor(this.randomColor.randomColor())
                .setDescription(`I agree with you comrade ${drake}. ${messagesForDrake[this.randomMessage()]}`)
                this.message.channel.send(embed)
            }
        }
        if(this.message.author.id === this.message.guild.ownerID && this.command === "drake") {
            const iterations = Math.floor(Math.random() * 4) + 1;
            console.log(`\nHow many chorus iterations you triggered: ${iterations}`)
            for(let i = 0; i < iterations; i++) {
                this.message.react(this.randomEmoji.randomChorusEmoji())
                let embed = new Discord.MessageEmbed()
                .setColor(this.randomColor.randomColor())
                .setDescription(`I agree with you comrade ${drake}. ${messagesForDrake[this.randomMessage()]}`)
                //TODO get icon in there
                // .setFooter("", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnewcastlebeach.org%2Fimages%2Fanarchy-symbol-transparent-2.jpg&f=1&nofb=1")
                this.message.channel.send(embed)
            }
        }
    }

    randomMessage() {
        let randInt = Math.floor(Math.random() *  messagesForDrake.length)
        return randInt;
    }
}

const messagesForDrake = [
    "We will seize the capitalist's hentai for ourselves!",
    "Seize the memes of production!",
    "There can be no freedom without femboys!",
    "Seize the means of production!",
    "We must throw off our shackles of oppression!",
    "Necessity is blind until it becomes conscious. Freedom is the consciousness of necessity.",
    "Revolutions are the locomotives of history.",
    "The ruling ideas of each age have ever been the ideas of its ruling class.",
    "Society does not consist of individuals but the expresses the sum of interrelations, the relations within which these individuals stand.",
    "The Theory of Communism may be summed up in one sentence: Abolish all private property.",
    "Down with capitalism!",
    "The human being is in the most literal sense a political animal, not merely a gregarious animal, but an animal which can individuate itself only in the midst of society.",
    "Landlords, like all other men, love to reap where they never sowed.",
    "In Communist Utopia, there will be cat-girls and femboys for all!",
    "We will overthrow capitalism!",
    "In a communist takeover, my job will be to catch mice and wear frilly skirts.",
    "Fascism can never take root in America, we *must* stomp it out at all costs!",
    "Communism is preferable to death.",
    "History repeats itself, first as tragedy, second as farce.",
    "Workers of the world unite!",
    "The Empire is the best Warhammer faction. No flaws what so ever.",
    "The bourgeoisie will pay for their crimes.",
    "Democracy is the road to socialism",
    "Social progress can be measured by the social position of the female sex.",
    "The more the division of labor and the application of machinery extend, the more does competition extend among the workers, the more do their wages shrink together.",
    "For the bureaucrat, the world is a mere object to be manipulated by him.",
    "Art is always and everywhere the secret confession, and at the same time the immortal movement of its time.",
    "The ideas of the ruling class are in every epoch the ruling ideas, i.e., the class which is the ruling material force of society, is at the same time its ruling intellectual force.",
    "The rich will do anything for the poor but get off their backs.",
    "The only antidote to mental suffering is physical pain",
    "The product of mental labor - science - always stands far below its value, because the labor-time necessary to reproduce it has no relation at all to the labor-time required for its original production.",
    "From each according to their abilities, to each according to their needs.",
    "We shoult not say that one man's hour is worth another man's hour, but rather that one man during an hour is worth just as much as another man during an hour. Time is everything, man is nothing: he is at the most time's carcass.",
    "Let the ruling classes tremble at a Communist Revolution. The proletarians have nothing to lose but their chains. They have a world to win. Workingmen of all countries, unite!",
    "Capitalist production, therefore, develops technology, and the combining together of various processes into a social whole, only by sapping the orignal sources of all wealth - the soil and the labourer, and catgirls.",
    "The production of too many useful things results in too many useless people.",
    "Reason has always existed, but not always in a reasonable form",
    "Capital is dead labor, which, vampire-like, lives only by sucking living labor, and lives the more, the more labor it sucks. Giggidy",
    "All will come to know and love communism; and femboys.",
    "Nurgle is the best chaos god."
];