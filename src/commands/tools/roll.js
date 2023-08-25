const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll for character stats!'),
    async execute(interaction, client) {
        const numberOfDie = 4;
        const rollArray = [];
        const numberOfStatRolls = 6;

        for(let i = 0; i < numberOfStatRolls; i++) {
            let score = [];
            for(let x =0; x < numberOfDie; x++) {
                let d6 = Math.floor((Math.random() * 6)+1);
                score.push(d6);
            }

            const sortScore = score.sort().filter((_,i) => i)   //This works by sorting and then creating a new array from the items where indeces are truthy(anything but 0)
            let newScore = sortScore[0] + sortScore[1] + sortScore[2];
            newScore < 8 ? rollArray.push(8):rollArray.push(newScore);
        }

        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const embed = new EmbedBuilder()
        .setTitle(`${interaction.member.nickname ? interaction.member.nickname : interaction.member.user.globalName}'s stat roll array!`)
        .setColor(`${randomColor}`)
        .setTimestamp(Date.now())
        .setThumbnail(interaction.member.displayAvatarURL())
        .addFields([
            {
                name: 'First Stat',
                value: `${rollArray[0]}`,
                inline: true
            },
            {
                name: 'Second Stat',
                value: `${rollArray[1]}`,
                inline: true
            },
            {
                name: 'Third Stat',
                value: `${rollArray[2]}`,
                inline: true
            },
            {
                name: 'Fourth Stat',
                value: `${rollArray[3]}`,
                inline: true
            },
            {
                name: 'Fifth Stat',
                value: `${rollArray[4]}`,
                inline: true
            },
            {
                name: 'Sixth Stat',
                value: `${rollArray[5]}`,
                inline: true
            }
        ]);
                            
        await interaction.reply({
            embeds: [embed]
        });
    }
}