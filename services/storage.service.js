import { homedir } from 'os';
import { join } from 'path';
import { stat, readFile, writeFile } from 'fs/promises';

const fileName = join(homedir(), 'weather-data.json');

export const STORAGE_KEY = {
    token: 'token',
    city: 'city',
};

export async function getItem(key) {
    const data = await getData();

    return data?.[key];
}

export async function setItem(key, value) {
    const data = await getData() || {};

    data[key] = value;

    await writeFile(fileName, JSON.stringify(data));
}

async function getData() {
    if (await isExist(fileName) === false) {
        return;
    }

    const data = await readFile(fileName);

    return JSON.parse(data);
}

async function isExist(path) {
    try {
        await stat(path);

        return true;
    } catch {
        return false;
    }
}
