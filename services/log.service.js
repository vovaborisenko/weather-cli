import chalk from 'chalk';
import dedent from 'dedent-js';

export function printError(error) {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
}

export function printSuccess(message) {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
}

export function printHelp() {
    console.log(dedent`
    ${chalk.bgCyan(' HELP ')}

    weather                вывод погоды    
    weather -h             помощь          
    weather -s <city>      установка города
    weather -t <api-key>   установка токена
    `);
}
