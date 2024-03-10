#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { STORAGE_KEY, setItem, getItem } from './services/storage.service.js';

async function saveToken(token) {
    if (!token?.length) {
        printError('Токен не передан');

        return;
    }

    try {
        await setItem(STORAGE_KEY.token, token);

        printSuccess('Токен успешно сохранен');
    } catch (error) {
        printError(error.message);
    }
}

async function saveCity(city) {
    if (!city?.length) {
        printError('Город не передан');

        return;
    }

    try {
        await setItem(STORAGE_KEY.city, city);

        printSuccess('Город успешно сохранен');
    } catch (error) {
        printError(error.message);
    }
}

async function getForecast() {
    const city = await getItem(STORAGE_KEY.city);

    try {
        const weather = await getWeather(city);

        printWeather(weather);
    } catch (error) {
        if (!error?.isAxiosError) {
            printError(error.message);

            return;
        }

        const message = {
            400: 'Город не передан',
            401: 'Неверно указан токен',
            404: `Неверно указан город. Указанный город: ${city}`,
        }[error.response?.status] || 'Ошибка!';

        printError(message);
    }
}

function initCLI() {
    const { h: isHelp, c: city, t: token } = getArgs(process.argv);

    if (isHelp) {
        printHelp();

        return;
    }

    if (!city && !token) {
        getForecast();

        return;
    }

    if (city) {
        saveCity(city);
    }

    if (token) {
        saveToken(token);
    }
}

initCLI();
