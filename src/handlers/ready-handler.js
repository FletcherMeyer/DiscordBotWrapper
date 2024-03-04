const { settings } = require('../config.json');
const { coloredConsoleLog } = require("../utilities/color-shell-text");
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

module.exports = {
    async execute(readyClient){
        try {
        if (settings.displayInfoOnReady){
            coloredConsoleLog(`colorPurpleClient Information:`);
            coloredConsoleLog(`colorPurpleServers:colorReset ${readyClient.guilds.cache.size}\n`);
        }
        
        readyClient.user.setPresence({ activities: [{ name: `Splice the cake! 🍰`, type: ActivityType.Custom }], status: 'Online', });
        coloredConsoleLog(`colorGreenReady Success!colorReset Logged in as ${readyClient.user.tag}\n`);
    } catch (e) {
        coloredConsoleLog(`colorRedError!colorReset Issue with ready handler.\n`);
        console.log(e);
    }
    }
}