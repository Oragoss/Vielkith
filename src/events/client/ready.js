const chalk = require('chalk');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${chalk.magenta(client.user.tag)} is logged in and online!`);
    }
}