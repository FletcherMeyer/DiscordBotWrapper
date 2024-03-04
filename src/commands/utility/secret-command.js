const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    secret: true,
	data: new SlashCommandBuilder()
		.setName('secretcommand')
		.setDescription('Teehee...'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
	description: "This is a secret, awesome command.",
	isCommand: true,
	private: true,

};