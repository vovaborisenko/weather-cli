import chalk from 'chalk';
import dedent from 'dedent-js';
import { getWeatherEmoji, getWindDirection } from './api.service.js';

export function printError(error) {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
}

export function printSuccess(message) {
    console.log(chalk.bgGreen(' SUCCESS '), message);
}

export function printHelp() {
    console.log(dedent`
    ${chalk.bgCyan(' HELP ')}

    weather                вывод погоды    
    weather -h             помощь          
    weather -c <city>      установка города
    weather -t <api-key>   установка токена
    `);
}

export function printWeather({ name, weather, main, sys, wind }) {
    const { icon, description } = weather[0];

    console.log(dedent`
    ${chalk.bgYellowBright(' WEATHER ')} Погода в городе: ${name}
    ${getWeatherEmoji(icon)}  ${description}
    температура: ${main.temp} ℃  (ощущается как: ${main.feels_like} ℃ )
    скорость и направление ветра: ${wind.speed} м/с (порывами до ${wind.gust} м/с) (${getWindDirection(wind.deg)})
    восход: ${new Date(sys.sunrise * 1000).toLocaleTimeString()}
    заход: ${new Date(sys.sunset * 1000).toLocaleTimeString()}`);
}
