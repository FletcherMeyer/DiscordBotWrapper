const colors = {
    "colorRed": "\u001b[1;31m",
    "colorGreen": "\u001b[1;32m",
    "colorYellow": "\u001b[1;33m",
    "colorBlue": "\u001b[1;34m",
    "colorPurple": "\u001b[1;35m",
    "colorCyan": "\u001b[1;36m",
    "colorReset": "\u001b[0m",
}

/**
 * @param "String to convert."
 * Uses colors: red, green, yellow, blue, purple, cyan. 
 */
const convertColors = (string) => {
    if (string == null) return; 

    for (const color in colors) {
        string = string.replaceAll(color, colors[color]);
    }

    string += colors["colorReset"];

    return string;
}
/**
 * @param "String to print."
 * Uses colors: red, green, yellow, blue, purple, cyan. 
 */
const coloredConsoleLog = (string) => {
    if (string == null) return; 

    for (const color in colors) {
        string = string.replaceAll(color, colors[color]);
    }

    string += colors["colorReset"];

    console.log(string);
}

module.exports = { convertColors, coloredConsoleLog }; 