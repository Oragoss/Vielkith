module.exports = {
    data: {
        name: 'yt'
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: 'https://youtube.com'
        });
    }
}