const { coloredConsoleLog } = require("../utilities/color-shell-text");

module.exports = {
    async execute(readyClient){
        coloredConsoleLog(`colorGreenReady Success!colorReset Logged in as ${readyClient.user.tag}`);
    }
}