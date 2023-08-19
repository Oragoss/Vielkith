const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('menu')
    .setDescription('Returns a select menu'),
    async execute(interaction, client) {
        const menu = new StringSelectMenuBuilder()
        .setCustomId(`sub-menu`)
        .setMinValues(1)
        .setMaxValues(1)
        .setOptions(
            new StringSelectMenuOptionBuilder({
                label: `Example Option #1`,
                value: `https://www.youtube.com/@signifiedbsides1129`
            }),
            new StringSelectMenuOptionBuilder({
                label: `Example Option #2`,
                value: `https://www.youtube.com/@weshammer`
            }),
        );

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)]
        })
    }
}