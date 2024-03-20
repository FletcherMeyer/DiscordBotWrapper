const { token, settings } = require('../config.json');
const { coloredConsoleLog } = require("../utilities/color-shell-text");
const mainFile = require("../main/main.js");

module.exports = {
    async execute() {
        if (settings.preventLogin) {
            return coloredConsoleLog("colorYellowWarningcolorReset Login Disabled.\n");/* Red color for the shell. */
        }

        if (settings.sharding) {
            const { ShardingManager } = require('discord.js');

            const manager = new ShardingManager('./main/main.js', {
                totalShards: settings.shardCount,
                token: token,
                timeout: -1,
                respawn: true            
            });
            manager.on('shardCreate', shard => {
                coloredConsoleLog(`colorGreenShard Success!\n|colorReset Launched shard ${shard.id}\n`);
            });

            manager.spawn({ amount: 'auto', delay: 5500, timeout: 30000 }).catch(e => {
                coloredConsoleLog(`colorRedError! Some shard could not spawn.`);
                console.log(e + '\n');
            });
        }

        try {
            /* Need to split into two. One for regular process, the other for sharding.*/
            /* Look into running other child processes on node.js for the regular process to run bot.js and kill index.js.*/
            mainFile.execute();
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