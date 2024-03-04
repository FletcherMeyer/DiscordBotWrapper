const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');
const { coloredConsoleLog } = require("../utilities/color-shell-text");

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            if (!'private' in command || !'isNotCommand' in command) {
                coloredConsoleLog(`colorYellowWarning!colorReset The command at ${filePath} is missing a "private" or "isNotCommand" property. It is assumed this command is private and will not be pushed.\n`);
            } else if (!command.private && !command.isNotCommand) {
                commands.push(command.data.toJSON());
            }
        } else {
            coloredConsoleLog(`colorRedError!colorReset The command at ${filePath} is missing a required "data" or "execute" property.\n`);
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    try {
        coloredConsoleLog(`colorYellowWarningcolorReset Started refreshing ${commands.length} application (/) commands.`);

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        coloredConsoleLog(`colorGreenSuccess!colorReset Reloaded ${commands.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();