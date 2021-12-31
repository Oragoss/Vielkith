import {prefix} from '../config';
import {drake, triggerId} from '../config';

const chorus = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence
    if(message.author.username === triggerId || ((message.author.id === message.guild.ownerID) && command === "drake")) {
        if(Math.floor(Math.random() * 100) >= 5 ) return;
        for(let i = 0; i < (Math.floor(Math.random() * 5)); i++) {
            message.channel.send(`I agree with you comrade ${drake}. ${messagesForDrake[randomMessage()]}`);
        }
    }
}

const randomMessage = () => {
    let randInt = Math.floor(Math.random() *  messagesForDrake.length)
    return randInt;
}

const messagesForDrake = [
    "We will seize the Capitalist's hentai for ourselves!",
    "Seize the memes of production!",
    "There can be no freedom without femboys!",
    "Seize the means of production!",
    "We must throw off our shackles of oppression!",
    "Necessity is blind until it becomes conscious. Freedom is the consciousness of necessity.",
    "Revolutions are the locomotives of history.",
    "The ruling ideas of each age have ever been the ideas of its ruling class.",
    "Society does not consist of individuals but the expresses the sum of interrelations, the relations within which these individuals stand.",
    "The theory of Communism may be summed up in one sentence: Abolish all private property.",
    "Down with Capitalism!",
    "The human being is in the most literal sense a political animal, not merely a gregarious animal, but an animal which can individuate itself only in the midst of society.",
    "Landlords, like all other men, love to reap where they never sowed.",
    "In Communist Utopia, there will be cat-girls and femboys for all!",
    "We will overthrow Capitalism!",
    "In a Communist takeover, my job will be to catch mice and wear frilly skirts.",
    "Fascism can never take root in America, we *must* stomp it out at all costs!",
    "Communism is preferable to death.",
    "History repeats itself, first as tragedy, second as farce.",
    "Workers of the world unite!",
    "The Empire is the best Warhammer faction. No flaws what so ever.",
    "The bourgeoisie will pay for their crimes.",
    "Democracy is the road to Socialism",
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
    "All will come to know and love Communism."
];

export default chorus;