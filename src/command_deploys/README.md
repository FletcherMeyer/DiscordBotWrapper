# Usage
There are two files with distinct actions in this folder. To run either file, paste the following in the terminal:

node .\command_deploys\global-deploy.js
node .\command_deploys\guild-deploy.js

The global-deploy will publish all non-private commands to all Discord servers.
The guild-deploy will publish all commands to the guildid listed in ".\config.json".

To denote a .js file as a module, function, or some other file that does not serve as a command, use "isNotCommand: true," in the  file.

Using "private" will only allow it to be published to the guild listed in ".\config.json".