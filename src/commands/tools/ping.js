const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns with my ping!'),
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