const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nextgame')
    .setDescription('Returns with the date for next game'),
    async execute(interaction) {
       
        //TODO: Set the next game using only inputs. Will possibly need to set up mongo db
        //How to get unix numbers manually
        //https://www.unixtimestamp.com/
        const unixNextGameDate = 1695346200;
        const unixNow = Math.floor(new Date().getTime() / 1000);
        
        const time = `The next game will be on \<t:${unixNextGameDate}:F\>`
        const newMessage = `${unixNextGameDate > unixNow ? time : "Ask the DM when the next game is! He forgot to tell me 😭..."}`;
       
        await interaction.reply({
            content: newMessage
        });
    }
}