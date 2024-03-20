const { settings } = require('../config.json');
const { coloredConsoleLog } = require("../utilities/color-shell-text");

module.exports = {
    async execute() {
        if (settings.logLeftServers){
            const currentTime = new Date();
            coloredConsoleLog("colorRed- Server Left!");
            coloredConsoleLog(`colorRed|colorReset ${currentTime.toUTCString()} \n`)
        } 
    }
}