const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder} = require('discord.js');
const { SplitUrlTitlesAndPhotos } = require('../../helpers/SplitUrlTitlesAndPhotos');
const { RandomLink } = require('../../helpers/RandomLink');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('aww')
    .setDescription('Returns a select menu with your choice of cute pictures!'),
    async execute(interaction, client) {
        const splitUrlTitlesAndPhotos = new SplitUrlTitlesAndPhotos();
        const randomLink = new RandomLink();
        
        //Data
        const randomAww = await splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos(randomLink.randomAwwLink());
        const cat = await splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos('https://www.reddit.com/r/cat.json');
        const dog = await splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos('https://www.reddit.com/r/dog.json');
        const ferret = await splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos('https://www.reddit.com/r/ferret.json');
        const chinchilla = await splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos('https://www.reddit.com/r/chinchilla.json');

        //TODO: Make this faster?
        const menu = new StringSelectMenuBuilder()
        .setCustomId(`aww`)
        .setMinValues(1)
        .setMaxValues(1)
        .setOptions(
            new StringSelectMenuOptionBuilder({
                label: `Random`,
                value: (`${randomAww.title}\n${randomAww.url}`).length > 100 ? `${randomAww.url}`: `${randomAww.title}\n${randomAww.url}`
            }),
            new StringSelectMenuOptionBuilder({
                label: `Cat`,
                value: (`${cat.title}\n${cat.url}`).length > 100 ? `${cat.url}`: `${cat.title}\n${cat.url}`
            }),
            new StringSelectMenuOptionBuilder({
                label: `Dog`,
                value: (`${dog.title}\n${dog.url}`).length > 100 ? `${dog.url}`: `${dog.title}\n${dog.url}`
            }),
            new StringSelectMenuOptionBuilder({
                label: `Ferret`,
                value: (`${ferret.title}\n${ferret.url}`).length > 100 ? `${ferret.url}`: `${ferret.title}\n${ferret.url}`
            }),
            new StringSelectMenuOptionBuilder({
                label: `Chincilla`,
                value: (`${chinchilla.title}\n${chinchilla.url}`).length > 100 ? `${chinchilla.url}`: `${chinchilla.title}\n${chinchilla.url}`
            })
        );

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)]
        })
    }
}