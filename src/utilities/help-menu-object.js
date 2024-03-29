const fs = require('node:fs');
const path = require('node:path');
const foldersPath = path.join(__dirname, "../commands");
const commandFolders = fs.readdirSync(foldersPath);
const { coloredConsoleLog } = require("./color-shell-text");
/**
 * The purpose of this module is to allow for a help command that creates itself.
 * There is no need for going into the help command to edit it everytime a command is added.
 * To allow for further customization, the function only returns the object instead of sending the embed.
 * 
 * @returns Object containing all commands with the folder they're in as their key.
 */
const returnHelpObject = () => {
    let helpObject = {};
    try {
        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);

                if ('data' in command && 'execute' in command) {
                    if (!'private' in command || !'isNotCommand' in command) {
                        coloredConsoleLog(`colorYellowWarning!colorReset The command at ${filePath} is missing a "private" or "isNotCommand" property. It is assumed this command is private and will not be pushed.\n`);
                    } else if (!command.private && !command.isNotCommand) {
                        helpObject[folder] = command.data.name;
                    }
                } else {
                    coloredConsoleLog(`colorRedError!colorReset The command at ${filePath} is missing a required "data" or "execute" property.\n`);
                }
            }
        }

    } catch {
        coloredConsoleLog(`colorRedError!colorReset Help object could not be created.\n`)
    }
    return helpObject;
}

module.exports = { returnHelpObject }; 