const { token, settings } = require('../config.json');
const { coloredConsoleLog } = require("../utilities/color-shell-text");

module.exports = {
    async execute(client) {
        if (settings.preventLogin){
            return coloredConsoleLog("colorYellowWarningcolorReset Login Disabled.\n");/* Red color for the shell. */
        }

        try {
            client.login(token);
            coloredConsoleLog("colorGreenLogin Success!colorReset\n");/* Green color for the shell. */
        } catch (e) {
            coloredConsoleLog("colorRedLogin Failure!colorReset\n");/* Red color for the shell. */
            console.log(e);
        };

        /*
            If other relevent configurations need to be made at login and 
            prior to ready, they can be executed here.
        */

    }
}