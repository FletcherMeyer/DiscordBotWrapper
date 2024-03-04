const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

/* Initialize Commands */
const handleCommands = require("./handlers/command-handler");
handleCommands.execute(client);

/* Handle Interactions */
const handleInteraction = require("./handlers/interaction-handler");
client.on(Events.InteractionCreate, async interaction => {
	handleInteraction.execute(interaction);
});

/* Handle Startup */
const handleStartup = require("./handlers/ready-handler");
client.once(Events.ClientReady, readyClient => {
	handleStartup.execute(readyClient);
});

/* Login to Discord */
const handleLogin = require("./handlers/login-handler");
handleLogin.execute(client);

const { returnHelpObject } = require("./utilities/help-menu-object");
returnHelpObject();