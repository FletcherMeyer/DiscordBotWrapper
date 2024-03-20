const { coloredConsoleLog } = require("../utilities/color-shell-text");

module.exports = {
    async execute(interaction){
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        
        if (!command) {
            coloredConsoleLog(`colorRedError!colorReset No command matching ${interaction.commandName} was found.\n`);
            return;
        }
        
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}