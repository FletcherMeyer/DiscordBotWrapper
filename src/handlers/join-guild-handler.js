const { settings } = require('../config.json');
const { coloredConsoleLog } = require("../utilities/color-shell-text");

module.exports = {
    async execute() {
        if (settings.logJoinServers){
            const currentTime = new Date();
            coloredConsoleLog("colorGreen+ Server Join!");
            coloredConsoleLog(`colorGreen|colorReset ${currentTime.toUTCString()} \n`)
        } 
    }
}