require('dotenv').config();
const cryptoRandomString = require('crypto-random-string');

module.exports = {
    // log config
    logLevel: process.env.hasOwnProperty('LOG_LEVEL') ? process.env.LOG_LEVEL : 'debug', // One of 'fatal', 'error', 'warn', 'info', 'debug', 'trace' or 'silent'
    logPretty: process.env.hasOwnProperty('LOG_PRETTY') ? Boolean(process.env.LOG_PRETTY) : true,
    logPrettyColorize: process.env.hasOwnProperty('LOG_PRETTY_COLORIZE') ? Boolean(process.env.LOG_PRETTY_COLORIZE) : true,

    // http config
    httpPort: process.env.hasOwnProperty('HTTP_PORT') ? parseInt(process.env.API_PORT) : 3000,

    // http auth config
    httpAuth: process.env.hasOwnProperty('HTTP_AUTH') ? Boolean(process.env.HTTP_AUTH) : true,
    httpAuthAlgorithm: process.env.hasOwnProperty('HTTP_AUTH_ALGORITHM') ? process.env.HTTP_AUTH_ALGORITHM : 'HS256',
    httpAuthSecret: process.env.hasOwnProperty('HTTP__AUTH_SECRET') ? process.env.API_SECRET : cryptoRandomString({length: 32}),
};