const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Returns an example embed with many useful options'),
    async execute(interaction, client) {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const embed = new EmbedBuilder()
        .setTitle('This is an EMBED!')
        .setDescription('This is a description')
        .setColor(`${randomColor}`)
        .setImage(client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setAuthor({
            url: `https://youtube.com`,
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.member.nickname
        })
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: client.user.tag
        })
        .setURL('https://www.reddit.com/r/all')
        .addFields([
            {
                name: 'Custom field name 1',
                value: 'Custom field value 1',
                // inline: true
            },
            {
                name: 'Custom field name 2',
                value: 'Custom field value 2',
                // inline: true
            }
        ]);

        await interaction.reply({
            embeds: [embed]
        });
    }
}
