const fs = require('node:fs');
const path = require('node:path');
const foldersPath = path.join(__dirname, "../commands");
const commandFolders = fs.readdirSync(foldersPath);
const { Collection } = require("discord.js");
const { coloredConsoleLog } = require("../utilities/color-shell-text");

module.exports = {
    async execute(client) {
        client.commands = new Collection();

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                // Set a new item in the Collection with the key as the command name and the value as the exported module
                if ('data' in command && 'execute' in command) {
                    if (command.isNotCommand) return;
                    client.commands.set(command.data.name, command);
                } else {
                    coloredConsoleLog(`colorRedError!colorReset The command at ${filePath} is missing a required "data" or "execute" property.\n`);
                }
            }
        }
        coloredConsoleLog(`colorGreenCommand Handler Success!\n`)
    }
}