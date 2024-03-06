#!/usr/bin/env node
import { getArgs } from './helpers/args.js';

function initCLI() {
    const args = getArgs(process.argv);

    console.log(args);

    if (args.h) {
        // вывод помощи
    }

    if (args.s) {
        // установка города
    }

    if (args.t) {
        // установка api-key
    }

    // вывод погоды
}

initCLI();
