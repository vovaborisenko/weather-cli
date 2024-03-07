#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { setItem } from './services/storage.service.js';

async function saveToken(token) {
    if (!token?.length) {
        printError('Токен не передан');

        return;
    }

    try {
        await setItem('token', token);

        printSuccess('Токен успешно сохранен');
    } catch (error) {
        printError(error.message);
    }
}

function initCLI() {
    const args = getArgs(process.argv);

    console.log(args);

    if (args.h) {
        printHelp();
    }

    if (args.s) {
        // установка города
    }

    if (args.t) {
        saveToken(args.t);
    }

    // вывод погоды
}

initCLI();
