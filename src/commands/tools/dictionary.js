const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dictionary')
    .setDescription('Returns with a definition of the word.'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${Date.now() - message.createdTimestamp}`;
        await interaction.editReply({
            content: newMessage
        });
    }
}