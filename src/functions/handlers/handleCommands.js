const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

            const { commands, commandArray} = client;
            for(const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} has passed through the handler.`);
            }
        }

        const clientId = '406469744787718154';
        const guildId = '428211209855172629';
        const applicationId = '406469744787718154';
        const rest = new REST({version: '9'}).setToken(process.env.token);
        try {
            console.log('Started refreshing application (/) commands.');

            /**
             * Discord server section
             * //https://youtu.be/6IgOXmQMT68?list=PLv0io0WjFNn9LDsv1W4fOWygNFzY342Jm&t=1906
            */
            //Make bot to respond to one server (also known as a guild)
            // await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            //     body: client.commandArray
            // });

            //Let bot respond to any server it's in
            await rest.put(Routes.applicationCommands(applicationId), {
                body: client.commandArray
            });

            /**
             * End section
             */

            console.log('Successfully reloaded application (/) commands.')
        } catch (error) {
            console.error(error);
        }
    }
}