const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const { settings } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Returns list of commands and provides descriptive information on commands.'),
    async execute(interaction) {
        const embedColor = settings.embedColor || "#676767";

        const helpEmbed = new EmbedBuilder()
            .setColor(embedColor)
            .setDescription('Testing embeds.')
        ;
        await interaction.reply({ embeds: [helpEmbed] });

    },
    isCommand: true,
    private: false,
};