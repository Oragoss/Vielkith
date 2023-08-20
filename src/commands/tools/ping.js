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
        //Why editReply instead of reply? Well cause the tutorial guy didn't understand I guess
        //Edit reply is something you can have the bot do to literally edit their reply
        //https://discordjs.guide/slash-commands/response-methods.html#editing-responses
        await interaction.editReply({
            content: newMessage
        });
        
        //slashcommand docs and also example of how to ban someone
        //https://discordjs.guide/slash-commands/parsing-options.html#command-options
    }
}