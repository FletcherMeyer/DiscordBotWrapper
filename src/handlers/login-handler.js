const { token } = require('../config.json');
const { coloredConsoleLog } = require("../utilities/color-shell-text");

module.exports = {
    async execute(client) {
        try {
        client.login(token);
        coloredConsoleLog("colorGreenLogin Success!colorReset");/* Green color for the shell. */
        } catch (e) {
            coloredConsoleLog("colorRedLogin Failure!colorReset");/* Red color for the shell. */
            console.log(e);
        };

        /*
            If other relevent configurations need to be made at login and 
            prior to ready, they can be executed here.
        */

    }
}