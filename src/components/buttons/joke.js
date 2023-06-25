module.exports = {
    data: {
        name: 'joke'
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: 'Tell a funny joke here'
        });
    }
}