const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('define')
    .setDescription('Returns with a definition of the word.')
    .addStringOption(option => option.setName('word').setDescription('Word to clarify').setRequired(true)),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const word = interaction.options.getString('word');
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {credentials:"include"})
        const result = await response.json();
        const definition = result[0].meanings[0].definitions[0].definition ? `${word}: ${result[0].meanings[0].definitions[0].definition}` : "Sorry, I couldn't find a definition for that word."
        
        await interaction.editReply({
            content: definition
        });
    }
}