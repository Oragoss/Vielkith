module.exports = {
    data: {
        name: `aww`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `${interaction.values[0]}`
        });
    }
}