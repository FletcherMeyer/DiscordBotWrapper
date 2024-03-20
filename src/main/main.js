const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token } = require('../config.json');
module.exports = {
    async execute() {

        /* Initialize Commands */
        const handleCommands = require("../handlers/command-handler");
        handleCommands.execute(client);

        /* Handle Interactions */
        const handleInteraction = require("../handlers/interaction-handler");
        client.on(Events.InteractionCreate, async interaction => {
            handleInteraction.execute(interaction);
        });

        /* Handle Startup */
        const handleStartup = require("../handlers/ready-handler");
        client.once(Events.ClientReady, readyClient => {
            handleStartup.execute(readyClient);
        });

        /* Join Guild Handler */
        const handleNewGuild = require("../handlers/join-guild-handler");
        client.on(Events.GuildCreate, async () => {
            handleNewGuild.execute();
        });

        /* Left Guild Handler */
        const handleOldGuild = require("../handlers/left-guild-handler");
        client.on(Events.GuildDelete, async () => {
            handleOldGuild.execute();
        });

        client.login(token);
    }
}