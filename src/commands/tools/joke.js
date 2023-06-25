const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Return a button!'),
    async execute(interaction, client) {
        const button = new ButtonBuilder()
        .setCustomId('joke')
        // .setEmoji()
        .setLabel('Tell me a joke!')
        .setStyle(ButtonStyle.Success);

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(button)]
        });
    }
}