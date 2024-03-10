import dedent from 'dedent-js';

const messages = {
    ru: {
        weather_in_city: 'Погода в городе',
        temperature: 'температура',
        feels_like: 'ощущается как',
        wind_speed_and_direction: 'скорость и направление ветра',
        m_per_sec: 'м/с',
        sunrise: 'восход',
        sunset: 'заход',
        gust: 'порывами до',
        not_handed: 'не передан',
        saved: 'успешно сохранен',
        city_not_handed: 'Город не передан',
        city_invalid: 'Неверно указан город. Указанный город:',
        token_invalid: 'Неверно указан токен',
        error: 'Ошибка!',
        error_no_token: 'Нет токена, установите токен с помощью команды -t <api_key>',
        help_info: dedent`weather                вывод погоды    
                    weather -h             помощь          
                    weather -c <city>      установка города (можно задать сразу несколько городов через запятую)
                    weather -t <api-key>   установка токена
                    weather -l <lang>      установка языка`,
    },
    en: {
        weather_in_city: 'Weather in the city',
        temperature: 'temperature',
        feels_like: 'feels like',
        wind_speed_and_direction: 'wind speed and direction',
        m_per_sec: 'm/s',
        sunrise: 'sunrise',
        sunset: 'sunset',
        gust: 'gusts up',
        not_handed: 'not handed',
        saved: 'successfully saved',
        city_not_handed: 'City not handed',
        city_invalid: 'The city specified is incorrect. Specified city:',
        token_invalid: 'Invalid token specified',
        error: 'Error!',
        error_no_token: 'No token, set the token using the command -t <api_key>',
        help_info: dedent`weather                 weather output
                    weather -h              help
                    weather -c <city>       sets the city (you can specify several cities at once, separated by commas)
                    weather -t <api-key>    install token
                    weather -l <lang>       language setting`,
    }
};
let locale = 'en';

export function t(path) {
    return messages[locale]?.[path] || path;
}

export function setLocale(value) {
    locale = value || 'en';
};
