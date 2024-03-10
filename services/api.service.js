import axios from 'axios';
import { STORAGE_KEY, getItem } from './storage.service.js';

export async function getWeather(city) {
    const token = await getItem(STORAGE_KEY.token);

    if (!token) {
        throw new Error('Нет токена, установите токен с помощью команды -t <api_key>');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            units: 'metric',
            lang: 'ru'
        }
    });

    return data;
}

export function getWeatherEmoji(iconCode = '') {
    const code = iconCode.replace(/\D/g, '');

    return {
        '01': '☀️',
        '02': '🌤️',
        '03': '🌥️',
        '04': '☁️',
        '09': '🌧️',
        '10': '🌦️',
        '11': '⛈️',
        '13': '🌨️',
        '50': '🌫️',
    }[code] || '';
}

export function getWindDirection(degs = 0) {
    const directionList = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const step = 360 / directionList.length;
    const corelation = step / 2;
    const directionIndex = Math.floor((degs + corelation) / step);

    return directionList[directionIndex];
}
