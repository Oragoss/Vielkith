const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder} = require('discord.js');
const { SplitUrlTitlesAndPhotos } = require('../../helpers/SplitUrlTitlesAndPhotos');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('aww')
    .setDescription('Returns a select menu with your choice of cute pictures!'),
    async execute(interaction, client) {
        const splitUrlTitlesAndPhotos = new SplitUrlTitlesAndPhotos();
        const general = await splitUrlTitlesAndPhotos.splitUrlTitlesAndPhotos('https://www.reddit.com/r/aww.json');

        const menu = new StringSelectMenuBuilder()
        .setCustomId(`aww`)
        .setMinValues(1)
        .setMaxValues(1)
        .setOptions(
            new StringSelectMenuOptionBuilder({
                label: `General`,
                value: `${general.title}\n${general.url}`
            }),
            new StringSelectMenuOptionBuilder({
                label: `Wholesome`,
                value: `https://www.reddit.com/r/wholesomeMemes.json`
            }),
        );

        /**
         *  const aww = "https://www.reddit.com/r/aww.json";
        const wholesomeMemes = "https://www.reddit.com/r/wholesomeMemes.json";
        const eyebleach = "https://www.reddit.com/r/eyebleach.json";
        const hardcoreaww = "https://www.reddit.com/r/hardcoreaww.json";
        const choice = [aww, wholesomeMemes, eyebleach, hardcoreaww];
        let randomInt = Math.floor(Math.random() * choice.length);
        return choice[randomInt];
         */

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)]
        })
    }
}