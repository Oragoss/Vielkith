const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('advice')
    .setDescription('Ask the bot for some advice!'),
    async execute(interaction, client) {
        const response = await fetch("http://api.adviceslip.com/advice", {credentials:"include"});
        const result = await response.json();

        
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const embed = new EmbedBuilder()
        .setTitle(`Well, if you want my advice...`)
        .setDescription(result.slip.advice)
        .setColor(`${randomColor}`)
        .setTimestamp(Date.now())
        .setThumbnail(interaction.member.displayAvatarURL());
                            
        await interaction.reply({
            embeds: [embed]
        });
    }
}