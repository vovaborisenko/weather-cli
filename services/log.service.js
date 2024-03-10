import chalk from 'chalk';
import dedent from 'dedent-js';
import { getWeatherEmoji, getWindDirection } from './api.service.js';
import { t } from './i18n.service.js';

export function printError(error) {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
}

export function printSuccess(message) {
    console.log(chalk.bgGreen(' SUCCESS '), message);
}

export function printHelp() {
    console.log(dedent`
    ${chalk.bgCyan(' HELP ')}

    ${t('help_info')}
    `);
}

export function printWeather({ name, weather, main, sys, wind }) {
    const { icon, description } = weather[0];

    console.log(dedent`
    ${chalk.bgYellowBright(' WEATHER ')} ${t('weather_in_city')}: ${name}

    ${getWeatherEmoji(icon)}  ${description}
    ${t('temperature')}: ${main.temp} ℃  (${t('feels_like')}: ${main.feels_like} ℃ )

    ${t('wind_speed_and_direction')}: ${wind.speed} ${t('m_per_sec')} (${t('gust')} ${wind.gust} ${t('m_per_sec')}) (${getWindDirection(wind.deg)})

    ${t('sunrise')}: ${new Date(sys.sunrise * 1000).toLocaleTimeString()}
    ${t('sunset')}: ${new Date(sys.sunset * 1000).toLocaleTimeString()}
    
    `);
}
