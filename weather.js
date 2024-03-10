#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { setLocale, t } from './services/i18n.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { STORAGE_KEY, setItem, getItem } from './services/storage.service.js';

async function saveSetting(key, value) {
    if (!value?.length) {
        printError(`${key} ${t('not_handed')}`);

        return;
    }

    try {
        await setItem(key, value);

        printSuccess(`${key} ${t('saved')}`);
    } catch (error) {
        printError(error.message);
    }
}

async function getForecastByCity(city) {
    try {
        const weather = await getWeather(city);

        printWeather(weather);
    } catch (error) {
        if (!error?.isAxiosError) {
            printError(error.message);

            return;
        }

        const message = {
            400: t('city_not_handed'),
            401: t('token_invalid'),
            404: `${t('token_invalid')} ${city}`,
        }[error.response?.status] || t('error');

        printError(message);
    }
}

async function getForecast() {
    const cities = (await getItem(STORAGE_KEY.city)).split(',');

    cities.forEach((city) => getForecastByCity(city));
}

const ARGS_MAP = {
    c: STORAGE_KEY.city,
    t: STORAGE_KEY.token,
    l: STORAGE_KEY.language
};

async function initCLI() {
    const {
        h: isHelp,
        ...params
    } = getArgs(process.argv);

    setLocale(await getItem(STORAGE_KEY.language));

    if (isHelp) {
        printHelp();

        return;
    }

    if (!Object.keys(params).some(arg => ARGS_MAP[arg])) {
        getForecast();

        return;
    }

    Object.entries(params).forEach(([arg, value]) => {
        const key = ARGS_MAP[arg];

        if (!key) {
            return;
        }

        saveSetting(key, value);
    });
}

initCLI();
