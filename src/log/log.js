const CONFIG = require('../config');

const log = require('pino')({
    prettyPrint: CONFIG.logPretty ? (CONFIG.logPrettyColorize ? {colorize: true} : true) : false,
    level: CONFIG.logLevel
});
const logHttp = require('pino-http')({
    logger: log
});

module.exports = {
    log,
    logHttp
};